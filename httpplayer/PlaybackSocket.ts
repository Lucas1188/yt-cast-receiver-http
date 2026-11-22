import WebSocket from 'ws';
import { PLAYER_STATUSES, type Volume } from '../dist/index.js';
import type { TransportState } from './SonosTransport.js';

const LOG = '[HTTPPLAYER]';

export interface PlaybackSocketEvent {
  type: 'playback';
  transport: {
    state: TransportState;
    status?: string;
    speed?: string;
  };
  progress: {
    position: number;
    duration: number;
    title?: string;
  };
  volume: Volume;
  currentVideoId?: string | null;
  at?: number;
}

export interface PlaybackSnapshot {
  state: number;
  position: number;
  duration: number;
  volume: Volume;
  currentVideoId?: string | null;
}

interface Options {
  url: string;
  onSnapshot: (snapshot: PlaybackSnapshot) => void;
  onLog?: (message: string) => void;
}

export class PlaybackSocket {
  #url: string;
  #onSnapshot: (snapshot: PlaybackSnapshot) => void;
  #onLog?: (message: string) => void;
  #socket: WebSocket | null = null;
  #reconnectTimer: NodeJS.Timeout | null = null;
  #stopped = false;
  #connected = false;

  constructor(options: Options) {
    this.#url = options.url;
    this.#onSnapshot = options.onSnapshot;
    this.#onLog = options.onLog;
  }

  get isConnected(): boolean {
    return this.#connected;
  }

  start() {
    if (this.#socket || this.#reconnectTimer) return;
    this.#stopped = false;
    this.#connect();
  }

  stop() {
    this.#stopped = true;
    this.#connected = false;
    if (this.#reconnectTimer) {
      clearTimeout(this.#reconnectTimer);
      this.#reconnectTimer = null;
    }
    if (this.#socket) {
      this.#socket.close();
      this.#socket = null;
    }
  }

  #log(message: string) {
    if (this.#onLog) this.#onLog(`${LOG} ${message}`);
  }

  #connect() {
    if (this.#stopped) return;

    try {
      const socket = new WebSocket(this.#url);
      this.#socket = socket;

      socket.onopen = () => {
        this.#connected = true;
        this.#log(`WebSocket connected: ${this.#url}`);
      };
      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(String(event.data)) as PlaybackSocketEvent;
          if (payload.type !== 'playback' || !payload.transport?.state) return;

          const state = this.#mapState(payload.transport.state);
          if (state === undefined) return;

          this.#onSnapshot({
            state,
            position: Number(payload.progress?.position || 0),
            duration: Number(payload.progress?.duration || 0),
            volume: {
              level: Number(payload.volume?.level ?? 50),
              muted: !!payload.volume?.muted
            },
            currentVideoId: payload.currentVideoId
          });
        }
        catch (err) {
          this.#log(`WebSocket message error: ${err}`);
        }
      };
      socket.onerror = (event) => this.#log(`WebSocket error: ${String(event)}`);
      socket.onclose = () => {
        this.#connected = false;
        this.#socket = null;
        if (!this.#stopped) this.#scheduleReconnect();
      };
    }
    catch (err) {
      this.#log(`WebSocket connect error: ${err}`);
      this.#scheduleReconnect();
    }
  }

  #scheduleReconnect() {
    if (this.#reconnectTimer || this.#stopped) return;
    this.#log('WebSocket closed; reconnecting in 3s');
    this.#reconnectTimer = setTimeout(() => {
      this.#reconnectTimer = null;
      this.#connect();
    }, 3000);
  }

  #mapState(state: TransportState): number | undefined {
    switch (state) {
      case 'TRANSITIONING': return PLAYER_STATUSES.LOADING;
      case 'PLAYING': return PLAYER_STATUSES.PLAYING;
      case 'PAUSED_PLAYBACK': return PLAYER_STATUSES.PAUSED;
      case 'STOPPED': return PLAYER_STATUSES.STOPPED;
      default: return undefined;
    }
  }
}
