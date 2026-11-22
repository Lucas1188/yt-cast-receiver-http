import type { Request, Response, NextFunction } from 'express';
import type { Video } from '../dist';
import VideoLoader, { type VideoInfo } from './VideoLoader.js';

export interface StreamMetadataResponse {
  videoId: string;
  title: string;
  duration: number;
  streamUrl: string;
  src: string;
  channel?: string;
  artist?: string;
  album?: string;
  contentLength?: number;
  bitrate?: number;
  mimeType?: string;
  itag?: number;
}

interface ResolveBody {
  videoId?: string;
  playlistId?: string;
  params?: string;
  index?: number;
  ctt?: string;
  client?: 'yt' | 'ytmusic';
}

const MIN_RESOLVE_INTERVAL_MS = 10_000;

export class StreamMetadataApi {
  #loader = new VideoLoader();
  #chain: Promise<unknown> = Promise.resolve();
  #lastResolveAt = 0;

  #resolve(body: ResolveBody): Promise<StreamMetadataResponse> {
    const videoId = typeof body.videoId === 'string' ? body.videoId.trim() : '';
    if (!videoId) throw new Error('videoId is required');

    const context: Video['context'] = {};
    if (typeof body.playlistId === 'string' && body.playlistId) context.playlistId = body.playlistId;
    if (typeof body.params === 'string' && body.params) context.params = body.params;
    if (typeof body.index === 'number' && Number.isFinite(body.index)) context.index = body.index;
    if (typeof body.ctt === 'string' && body.ctt) context.ctt = body.ctt;

    const video = {
      id: videoId,
      client: body.client === 'ytmusic' ? 'YTMUSIC' : 'WEB',
      ...(Object.keys(context).length > 0 ? { context } : {})
    } as unknown as Video;

    return this.#loader.getInfo(video, { minimal: true }).then((info: VideoInfo | null) => {
      if (!info?.streamUrl) throw new Error('No stream URL resolved');
      return {
        videoId,
        title: info.title || videoId,
        duration: info.duration || 0,
        streamUrl: info.streamUrl,
        src: info.src,
        channel: info.channel,
        artist: info.artist,
        album: info.album,
        contentLength: info.stream?.contentLength,
        bitrate: info.stream?.bitrate,
        mimeType: info.stream?.mimeType,
        itag: info.stream?.itag
      };
    });
  }

  resolve(body: ResolveBody): Promise<StreamMetadataResponse> {
    const run = this.#chain.then(async () => {
      const wait = MIN_RESOLVE_INTERVAL_MS - (Date.now() - this.#lastResolveAt);
      if (this.#lastResolveAt && wait > 0) {
        await new Promise((resolve) => setTimeout(resolve, wait));
      }
      this.#lastResolveAt = Date.now();
      return this.#resolve(body);
    });
    this.#chain = run.catch(() => undefined);
    return run;
  }

  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.method !== 'POST' || req.path !== '/unholycast/resolve') {
        next();
        return;
      }

      const remote = req.socket.remoteAddress || '';
      if (!remote.startsWith('127.0.0.1') && !remote.startsWith('::1') && !remote.startsWith('::ffff:127.0.0.1')) {
        res.status(403).json({ error: 'local only' });
        return;
      }

      void this.resolve(req.body || {}).then(
        (metadata) => res.json(metadata),
        (error: unknown) => {
          const message = error instanceof Error ? error.message : String(error);
          const status = /429|rate|challenge|po.?token/i.test(message) ? 429 : 400;
          res.status(status).json({ error: message });
        }
      );
    };
  }
}
