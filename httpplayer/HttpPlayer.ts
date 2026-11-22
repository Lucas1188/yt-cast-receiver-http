import { Timer } from 'timer-node';
import { Player, type PlayerState, PLAYER_STATUSES, type Volume, STATUSES } from '../dist/index.js';
import type Video from '../dist/lib/app/Video.js';
import VideoLoader from './VideoLoader.js';
import { PlayerStatus } from 'yt-cast-receiver';
import type { TransportState, TransportStatus } from './SonosTransport.js';
import { SonosTransportStatus } from './SonosTransport.js';
import { PlaybackSocket, type PlaybackSnapshot } from './PlaybackSocket.js';

export interface FakeState {
  status: number;
  videoTitle: string;
  position: number;
  duration: number;
  volume: Volume;
}

const LOG = '[HTTPPLAYER]';
const END_THRESHOLD_SECONDS = 3;
const TIMEOUT_GRACE_SECONDS = 5;

/**
 * Custom Player implementation backed by Unholycast/Sonos.
 *
 * Internal control flow is event-driven from /poll state + position/duration.
 * The 1s poller remains because the YouTube application expects frequent
 * state/fakeState emissions with fresh position, duration and volume.
 */
export default class HttpPlayer extends Player {
  videoLoader: VideoLoader;
  currentVideoId: string | null;
  currentVideoTitle: string | null;
  timer: Timer;
  seekOffset: number;
  duration: number;
  timeout: NodeJS.Timeout | null;
  volume: Volume;
  port: number;
  url: string | "http://localhost:6969";
  poller: NodeJS.Timeout | null;
  private ending = false;
  private lastObservedState: PlayerStatus | undefined;
  private lastPosition = 0;
  private lastDuration = 0;
  private playbackSocket: PlaybackSocket;

  stateMap: Record<TransportState, number> = {
    'TRANSITIONING': PLAYER_STATUSES.LOADING,
    'PLAYING': PLAYER_STATUSES.PLAYING,
    'PAUSED_PLAYBACK': PLAYER_STATUSES.PAUSED,
    'STOPPED': PLAYER_STATUSES.STOPPED,
  };

  stateMap0: Record<number, TransportState> = {
    3: 'TRANSITIONING',
    1: 'PLAYING',
    2: 'PAUSED_PLAYBACK',
    4: 'STOPPED',
  };

  constructor(port: number) {
    super();
    this.videoLoader = new VideoLoader();
    this.currentVideoId = null;
    this.currentVideoTitle = null;
    this.timer = new Timer();
    this.seekOffset = 0;
    this.duration = 0;
    this.timeout = null;
    this.volume = { level: 50, muted: false };
    this.port = port;
    this.url = `http://localhost:${this.port}`;
    this.poller = null;
    this.playbackSocket = new PlaybackSocket({
      url: `${this.url.replace(/^http/, 'ws')}/ws/playback`,
      onSnapshot: (snapshot) => void this.#handleSocketSnapshot(snapshot),
      onLog: (message) => this.logger.info(message)
    });
    this.playbackSocket.start();
    this.on('state', this.#emitFakeState.bind(this));
  }

  protected doPlay(video: Video, position: number): Promise<boolean> {
    this.logger.info(`${LOG} Play ${video.id} at position ${position}s`);
    return this.#fakePlay(video, position);
  }

  protected doPause(): Promise<boolean> {
    this.logger.info(`${LOG} Pause`);
    return this.#fakePause();
  }

  protected doResume(): Promise<boolean> {
    this.logger.info(`${LOG} Resume`);
    return this.#fakeResume();
  }

  protected doStop(): Promise<boolean> {
    this.logger.info(`${LOG} Stop`);
    return this.#fakeStop();
  }

  protected doSeek(position: number): Promise<boolean> {
    this.logger.info(`${LOG} Seek to ${position}s`);
    return this.#fakeSeek(position);
  }

  protected async doSetVolume(volume: Volume): Promise<boolean> {
    try {
      this.logger.info(`${LOG} Trying to set volume ${volume.level}`);
      const res = await fetch(`${this.url}/volume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: volume.level, muted: volume.muted })
      });
      if (!res.ok) throw new Error(`Failed to set volume: ${res.status}`);
      this.volume = volume;
      return true;
    } catch (err) {
      this.logger.error(`${LOG} doSetVolume error: ${err}`);
      return false;
    }
  }

  protected async doGetVolume(): Promise<Volume> {
    try {
      const res = await fetch(`${this.url}/volume`);
      if (!res.ok) throw new Error(`Failed to get volume: ${res.status}`);
      const data = await res.json();
      this.logger.info(`${LOG} doGetVolume Got |V:${data.level} |M:${data.muted}`);
      this.volume = { level: data.level, muted: data.muted };
      return this.volume;
    } catch (err) {
      this.logger.error(`${LOG} doGetVolume error: ${err}`);
      return this.volume;
    }
  }

  protected async doGetPosition(): Promise<number> {
    try {
      const res = await fetch(`${this.url}/position`);
      if (!res.ok) throw new Error(`Failed to get position: ${res.status}`);
      const data = await res.json();
      this.logger.info(`${LOG} doGetPosition Got ${data.position}`);
      return data.position ?? (this.seekOffset + Math.floor(this.timer.ms() / 1000));
    } catch (err) {
      this.logger.error(`${LOG} doGetPosition error: ${err}`);
      return this.seekOffset + Math.floor(this.timer.ms() / 1000);
    }
  }

  protected async doGetDuration(): Promise<number> {
    try {
      const res = await fetch(`${this.url}/duration`);
      if (!res.ok) throw new Error(`Failed to get duration: ${res.status}`);
      const data = await res.json();
      this.duration = data.duration ?? this.duration;
      this.logger.info(`${LOG} doGetDuration Got ${data.duration}`);
      return this.duration;
    } catch (err) {
      this.logger.error(`${LOG} doGetDuration error: ${err}`);
      return this.duration;
    }
  }

  async #doPoll(): Promise<PlayerStatus> {
    try {
      const res = await fetch(`${this.url}/poll`);
      if (!res.ok) throw new Error(`Failed to poll state: ${res.status}`);
      const data = await res.json();
      const transportState = data.status as SonosTransportStatus;
      const newState = this.stateMap[transportState.current_transport_state] || undefined;
      this.logger.info(`${LOG} doPoll Got >> ${newState}[${transportState.current_transport_state}]`);

      if (newState) {
        if (this.status !== newState) {
          await this.notifyExternalStateChange(newState as PlayerStatus);
        } else {
          await this.notifyExternalStateChange();
        }

        await this.#handlePlaybackProgress(newState as PlayerStatus);
        this.lastObservedState = newState as PlayerStatus;
      }
      return newState as PlayerStatus;
    } catch (err) {
      this.logger.error(`${LOG} doPoll error: ${err}`);
      await this.doStop();
      await this.notifyExternalStateChange(PLAYER_STATUSES.STOPPED);
      return PLAYER_STATUSES.STOPPED;
    }
  }

  private async #handleSocketSnapshot(snapshot: PlaybackSnapshot): Promise<void> {
    this.lastPosition = snapshot.position;
    this.lastDuration = snapshot.duration;
    this.volume = snapshot.volume;

    if (this.status !== snapshot.state) {
      await this.notifyExternalStateChange(snapshot.state as PlayerStatus);
    } else {
      await this.notifyExternalStateChange();
    }

    await this.#handlePlaybackProgress(snapshot.state as PlayerStatus);
  }

  private async #handlePlaybackProgress(state: PlayerStatus): Promise<void> {
    if (this.ending || this.status !== PLAYER_STATUSES.PLAYING) return;

    const position = this.lastPosition || await this.doGetPosition();
    const duration = this.lastDuration || await this.doGetDuration();
    if (!Number.isFinite(position) || !Number.isFinite(duration) || duration <= 0) return;

    const remaining = duration - position;
    const naturalEnd = remaining <= END_THRESHOLD_SECONDS;
    const stoppedUnexpectedly = state === PLAYER_STATUSES.STOPPED && !naturalEnd;

    if (stoppedUnexpectedly) {
      this.logger.warn(`${LOG} Unexpected STOPPED at ${position}/${duration}s; waiting for recovery`);
      return;
    }

    if (naturalEnd) {
      await this.#finishCurrentTrack('poll');
    }
  }

  private async #finishCurrentTrack(reason: 'poll' | 'timeout'): Promise<void> {
    if (this.ending) return;
    this.ending = true;
    this.#resetTimeout();
    this.#resetPoller();

    try {
      // Keep pause-before-next: it gives Sonos/Unholycast a clean transport
      // boundary before the next play_uri and reduces bad-load races.
      await this.pause();
      this.seekOffset = 0;
      this.timer.stop().clear();
      this.logger.info(`${LOG} Playback ended (${reason}). Moving to next in list...`);
      await this.next();
    } finally {
      this.ending = false;
    }
  }

  async #fakeResume() {
    try {
      if (this.timer.isPaused()) this.timer.resume();
      else if (this.timer.isStopped() || !this.timer.isStarted()) this.timer.start();

      const res = await fetch(`${this.url}/resume`, { method: 'GET' });
      if (!res.ok) throw new Error('Resume failed');
      this.#startTimeout(this.duration - this.seekOffset);
      this.#startPoller(1);
      return true;
    } catch (err) {
      this.logger.error(`${LOG} #fakeResume error: ${err}`);
      return false;
    }
  }

  async #fakePlay(video: Video, position: number) {
    this.seekOffset = position;
    this.timer.stop();
    this.#resetPoller();
    this.#resetTimeout();
    this.ending = false;

    try {
      const info = await this.videoLoader.getInfo(video);
      if (!info) throw new Error(`Failed to retrieve info for ${video.id}`);

      const params = new URLSearchParams({
        videoId: String(video.id),
        title: String(info.title),
        duration: String(info.duration),
        position: String(position),
        streamUrl: String(info.streamUrl),
        src: String(info.src || ""),
        channel: String(info.channel || ""),
        artist: String(info.artist || ""),
        album: String(info.album || "")
      });

      const nextVideo = this.queue.getState().next;
      if (nextVideo && nextVideo.id !== video.id) {
        params.set('nextVideoId', String(nextVideo.id));
        params.set('nextTitle', String(nextVideo.id));
        params.set('nextDuration', '0');
        params.set('nextSrc', String(nextVideo.client === 'YTMUSIC' ? 'ytmusic' : 'yt'));
        if (nextVideo.context?.playlistId) params.set('nextPlaylistId', String(nextVideo.context.playlistId));
        if (nextVideo.context?.params) params.set('nextParams', String(nextVideo.context.params));
        if (nextVideo.context?.index !== undefined) params.set('nextIndex', String(nextVideo.context.index));
        if (nextVideo.context?.ctt) params.set('nextCtt', String(nextVideo.context.ctt));
      }

      const res = await fetch(`${this.url}/start?${params.toString()}`, { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}::${await res.text()}`);

      this.logger.info(`${LOG} #fakePlay Playing ${params.toString()} ${new Date().toLocaleTimeString()}`);
      const duration = info.duration || 0;
      this.currentVideoId = video.id;
      this.currentVideoTitle = info.title;
      this.lastPosition = position;
      this.lastDuration = duration;
      this.timer.start();
      this.duration = duration;
      this.#startTimeout(this.duration - this.seekOffset);
      this.#startPoller(1);
      return true;
    } catch (err) {
      this.logger.error(`${LOG} #fakePlay error: ${err}`);
      return false;
    }
  }

  async #fakePause() {
    try {
      this.logger.info(`${LOG} Calling PAUSE endpoint ${new Date().toLocaleTimeString()}`);
      const res = await fetch(`${this.url}/pause`, { method: 'GET' });
      if (!res.ok) throw new Error('Pause failed');
      this.timer.pause();
      this.#resetTimeout();
      return true;
    } catch (err) {
      this.logger.error(`${LOG} #fakePause error: ${err}`);
      return false;
    }
  }

  async #fakeStop() {
    try {
      const res = await fetch(`${this.url}/stop`, { method: 'GET' });
      if (!res.ok) throw new Error('Stop failed');
      this.seekOffset = 0;
      this.timer.stop().clear();
      this.#resetTimeout();
      return true;
    } catch (err) {
      this.logger.error(`${LOG} #fakeStop error: ${err}`);
      return false;
    }
  }

  async #fakeSeek(position: number) {
    try {
      this.#resetPoller();
      const res = await fetch(`${this.url}/seek?pos=${position}&state=${this.stateMap0[this.status]}`, { method: 'GET' });
      if (!res.ok) throw new Error(`Seek failed: ${await res.text()}`);
      this.timer.stop().clear();
      this.seekOffset = position;
      if (this.status === PLAYER_STATUSES.PLAYING) {
        return Promise.resolve(this.#fakeResume());
      }
      return true;
    } catch (err) {
      this.logger.error(`${LOG} #fakeSeek error: ${err}`);
      return false;
    }
  }

  #resetTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  #resetPoller() {
    if (this.poller) {
      clearTimeout(this.poller);
      this.poller = null;
    }
  }

  #startTimeout(duration: number) {
    if (!Number.isFinite(duration) || duration <= 0) {
      this.logger.warn(`${LOG} Skipping end timer for invalid duration: ${duration}`);
      return;
    }

    const timeoutSeconds = duration + TIMEOUT_GRACE_SECONDS;
    this.logger.info(`${LOG} timeout set for: ${timeoutSeconds}`);
    this.#resetTimeout();
    this.timeout = setTimeout(() => {
      void (async () => {
        if (this.ending) return;

        try {
          const sonosPosition = await this.doGetPosition();
          const sonosDuration = await this.doGetDuration();
          const remaining = sonosDuration - sonosPosition;

          if (remaining > END_THRESHOLD_SECONDS) {
            this.logger.info(`${LOG} Timeout fired early; Sonos reports ${remaining}s remaining. Extending timer.`);
            this.#startTimeout(remaining);
            this.#startPoller(1);
            return;
          }
        } catch (err) {
          this.logger.warn(`${LOG} Could not verify Sonos position at timeout: ${err}`);
        }

        await this.#finishCurrentTrack('timeout');
      })();
    }, timeoutSeconds * 1000);
  }

  #startPoller(duration: number) {
    this.logger.info(`${LOG} Set poller @ ${new Date().toLocaleTimeString()} to fire in ${duration} seconds`);
    this.poller = setTimeout(() => {
      void (async () => {
        if (this.playbackSocket.isConnected) {
          // WebSocket is the primary state source. Keep the fallback timer alive
          // but do not emit duplicate state events while the socket is healthy.
          if (!this.ending) this.#startPoller(1);
          return;
        }

        this.logger.info(`${LOG} Polling fallback for state ${new Date().toLocaleTimeString()}`);
        const state = await this.#doPoll();
        if (state !== PLAYER_STATUSES.PLAYING && !this.ending) {
          this.#startPoller(1);
        }
      })();
    }, duration * 1000);
  }

  #emitFakeState() {
    void (async () => {
      this.logger.info(`${LOG} #emitState ${this.status} ${new Date().toLocaleTimeString()}`);
      this.emit('fakeState', {
        status: this.status,
        videoId: this.currentVideoId,
        videoTitle: this.currentVideoTitle,
        duration: this.lastDuration || this.duration,
        position: this.lastPosition,
        volume: this.volume
      });
    })();
  }

  on(event: 'fakeState', listener: (data: FakeState) => void): this;
  on(event: 'state', listener: (data: { AID: string, current: PlayerState, previous: PlayerState | null }) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }
}
