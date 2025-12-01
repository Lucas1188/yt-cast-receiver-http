import { Timer } from 'timer-node';
import { Player, type PlayerState, PLAYER_STATUSES, type Volume, STATUSES } from '../dist/index.js';
import type Video from '../dist/lib/app/Video.js';
import VideoLoader from './VideoLoader.js';
import { PlayerStatus } from 'yt-cast-receiver';
import type { TransportState,TransportStatus } from './SonosTransport.js';
import { SonosTransportStatus } from './SonosTransport.js';

export interface FakeState {
  status: number;
  videoTitle: string;
  position: number;
  duration: number;
  volume: Volume;
}

/**
 * Custom implementation of {@link Player} for use with {@link FakePlayerDemo}.
 * Uses a timer to simulate playback and [YouTube.js](https://github.com/LuanRT/YouTube.js)
 * for fetching video info (see {@link VideoLoader}).
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
  port:number;
  url:string|"http://localhost:6969";
  poller: NodeJS.Timeout | null;
  stateMap: Record<TransportState,number> = {
      'TRANSITIONING': PLAYER_STATUSES.LOADING,
      'PLAYING': PLAYER_STATUSES.PLAYING,
      'PAUSED_PLAYBACK': PLAYER_STATUSES.PAUSED,
      'STOPPED': PLAYER_STATUSES.STOPPED,
    };
  stateMap0:Record<number,TransportState> ={
      3:'TRANSITIONING',
      1:'PLAYING',
      2:'PAUSED_PLAYBACK',
      4:'STOPPED'
  };
  constructor(port:number) {
    super();
    this.videoLoader = new VideoLoader();
    this.currentVideoId = null;
    this.currentVideoTitle = null;
    this.timer = new Timer();
    this.seekOffset = 0;
    this.duration = 0;
    this.timeout = null;
    this.volume = {
      level: 50,
      muted: false
    };
    this.port = port;
    this.url = `http://localhost:${this.port}`;
    this.poller = null;
    this.#startPoller(1);
    // When we receive a `state` event from the super class, signalling a change
    // In player state, we emit our own `fakeState` event for `FakeDemoPlayer` to consume.
    this.on('state', this.#emitFakeState.bind(this));
  }

  protected doPlay(video: Video, position: number): Promise<boolean> {
    this.logger.info(`[FakePlayer]: Play ${video.id} at position ${position}s`);
    return this.#fakePlay(video, position);
  }

  protected doPause(): Promise<boolean> {
    this.logger.info('[FakePlayer]: Pause');
    return this.#fakePause();
  }

  protected doResume(): Promise<boolean> {
    this.logger.info('[FakePlayer]: Resume');
    return this.#fakeResume();
  }

  protected doStop(): Promise<boolean> {
    this.logger.info('[FakePlayer]: Stop');
    return this.#fakeStop();
  }

  protected doSeek(position: number): Promise<boolean> {
    this.logger.info(`[FakePlayer]: Seek to ${position}s`);
    return this.#fakeSeek(position);
  }

  protected async doSetVolume(volume: Volume): Promise<boolean> {
  try {
    this.logger.info(`[FakePlayer]: Trying to set volume ${volume.level}`);
    const res = await fetch(`${this.url}/volume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: volume.level,
        muted: volume.muted
      })
    });

    if (!res.ok) throw new Error(`Failed to set volume: ${res.status}`);
    this.volume = volume;
    return true;
  } catch (err) {
    this.logger.error(`[FakePlayer] doSetVolume error: ${err}`);
    return false;
  }
}

protected async doGetVolume(): Promise<Volume> {
  try {
    const res = await fetch(`${this.url}/volume`);
    if (!res.ok) throw new Error(`Failed to get volume: ${res.status}`);
    const data = await res.json();
    this.logger.info(`[FakePlayer] doGetVolume Got |V:${data.level} |M:${data.muted}`);

    this.volume = {
      level: data.level,
      muted: data.muted
    };
    return this.volume;
  } catch (err) {
    this.logger.error(`[FakePlayer] doGetVolume error: ${err}`);
    // fallback to last known volume
    return this.volume;
  }
}
protected async doGetPosition(): Promise<number> {
  try {
    const res = await fetch(`${this.url}/position`);
    if (!res.ok) throw new Error(`Failed to get position: ${res.status}`);
    const data = await res.json();
    // The backend returns playback position in seconds    
    this.logger.info(`[FakePlayer] doGetPositon Got ${data.position}`);

    return data.position ?? (this.seekOffset + Math.floor(this.timer.ms() / 1000));
  } catch (err) {
    this.logger.error(`[FakePlayer] doGetPosition error: ${err}`);
    // fallback to locally simulated timer
    return this.seekOffset + Math.floor(this.timer.ms() / 1000);
  }
}

protected async doGetDuration(): Promise<number> {
  try {
    const res = await fetch(`${this.url}/duration`);
    if (!res.ok) throw new Error(`Failed to get duration: ${res.status}`);
    const data = await res.json();
    this.duration = data.duration ?? this.duration;
    this.logger.info(`[FakePlayer] doGetDuration Got ${data.duration}`);

    return this.duration;
  } catch (err) {
    this.logger.error(`[FakePlayer] doGetDuration error: ${err}`);
    return this.duration;
  }
}
async #doPoll(){
  try{
    const res = await fetch(`${this.url}/poll`);
    if (!res.ok) throw new Error(`Failed to poll state: ${res.status}`);
    const data = await res.json();
    const transport_state = data.status as SonosTransportStatus;
    const newState = this.stateMap[transport_state.current_transport_state] || undefined;
    this.logger.info(`[FakePlayer] doPoll Got >> ${newState}[${transport_state.current_transport_state}]`);

    if(newState){
      if (this.status !== newState) {
        this.notifyExternalStateChange(newState as PlayerStatus)
      }else{
        this.notifyExternalStateChange();
      }
    }else{
      this.notifyExternalStateChange();
    }
  }catch(err) {
    this.logger.error(`[FakePlayer] doPoll error: ${err}`);
    this.doStop();
    this.notifyExternalStateChange(PLAYER_STATUSES.STOPPED);
  }
}
  async #fakeResume() {
    try {
      if (this.timer.isPaused()) {
        this.timer.resume();
      }
      else if (this.timer.isStopped() || !this.timer.isStarted()) {
        this.timer.start();
      }
      const res = await fetch(`${this.url}/resume`,{method:'GET'});
      if (!res.ok) throw new Error('Resume failed');
      this.#startTimeout(this.duration - this.seekOffset);
      this.#startPoller(1);
      return true;
    } catch (err) {
      this.logger.error(`[FakePlayer] #fakeResume error: ${err}`);
      return false;
    }
  }

  async #fakePlay(video: Video, position: number) {

    this.seekOffset = position;
    this.timer.stop();
    this.#resetPoller();
    this.#resetTimeout();
    
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
      
      const res = await fetch(`${this.url}/start?${params.toString()}`, {
        method: 'GET'
      });
      
      if (!res.ok)
      {
          throw new Error(`HTTP ${res.status}: ${res.statusText}::${await res.text()}`);
      }
      this.logger.info(`[FakePlayer] #fakePlay Playing ${params.toString()} ${new Date().toLocaleTimeString()}`);
      const duration = info.duration || 0;
      this.currentVideoId = video.id;
      this.currentVideoTitle = info.title;
      this.timer.start();
      this.duration = duration;
      this.#startTimeout(this.duration - this.seekOffset);
      this.#startPoller(1);
      return true;
    }catch (err) {
      this.logger.error(`[FakePlayer] #fakePlay error: ${err}`);
      return false;
    }
  }

  async #fakePause() {
    try {
      this.logger.info("[FakePlayer] Calling PAUSE endpoint ${new Date().toLocaleTimeString()}")
      const res = await fetch(`${this.url}/pause`,{method:'GET'});
      if (!res.ok) throw new Error('Pause failed');
      this.timer.pause();
      this.#resetTimeout();
      return true;
    } catch (err) {
      this.logger.error(`[FakePlayer] #fakePause error: ${err}`);
      return false;
    }
  }

  async #fakeStop() {
    try {
      const res = await fetch(`${this.url}/stop`,{method:'GET'});
      if (!res.ok) throw new Error('Stop failed');
      this.seekOffset = 0;
      this.timer.stop().clear();
      this.#resetTimeout();
      return true;
    } catch (err) {
      this.logger.error(`[FakePlayer] #fakeStop error: ${err}`);
      return false;
    }
  }

  async #fakeSeek(position: number) {
    try {
      this.#resetPoller();
      const res = await fetch(`${this.url}/seek?pos=${position}&state=${this.stateMap0[this.status]}`,{method:'GET'});
      if (!res.ok) throw new Error(`Seek failed: ${await res.text()}`);
      //const data = await res.json();
      //this.notifyExternalStateChange(this.stateMap[(data.status as SonosTransportStatus).current_transport_state] as PlayerStatus);
      this.timer.stop().clear();
      this.seekOffset = position;
      // this.timer.start();
      // this.#resetTimeout();
      // this.#startTimeout(this.duration-position)
      // this.#startPoller(1);
      if (this.status === PLAYER_STATUSES.PLAYING) {
        return Promise.resolve(this.#fakeResume());
      }
      return true;
    } catch (err) {
      this.logger.error(`[FakePlayer] #fakeSeek error: ${err}`);
      return false;
    }
  }

  #resetTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
  #resetPoller(){
    if(this.poller){
      clearTimeout(this.poller);
      this.poller = null;
    }
  }
  #startTimeout(duration: number) {
    this.logger.info(`[FAKEPLAYER] ||| timeout set for: ${duration}`)
    this.#resetTimeout();
    this.timeout = setTimeout(() => {
      void (async () => {
        this.#resetPoller();
        await this.pause()
        this.seekOffset = 0;
        this.timer.stop().clear();
        this.logger.info('[FakePlayer] Playback ended. Moving to next in list...');
        await this.next();
        this.#startPoller(1);
      })();
    }, (duration) * 1000);
  }

  #startPoller(duration:number){
    
    this.poller = setTimeout(() => {
        void (async () => {
          this.logger.info(`[FAKEPLAYER] Polling for state ${new Date().toLocaleTimeString()}`);
          this.#doPoll();
          this.#startPoller(1);
          })();
      }, (duration) * 1000);
  }

  #emitFakeState() {
    void (async () => {
      this.logger.info(`[FakePlayer] #emitState ${this.status} ${new Date().toLocaleTimeString()}`);
      this.emit('fakeState', {
        status: this.status,
        videoId: this.currentVideoId,
        videoTitle: this.currentVideoTitle,
        duration: await this.getDuration(),
        position: await this.getPosition(),
        volume: await this.getVolume()
      });
      
    })();
  }

  on(event: 'fakeState', listener: (data: FakeState) => void): this;
  on(event: 'state', listener: (data: {AID: string, current: PlayerState, previous: PlayerState | null}) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }
}
