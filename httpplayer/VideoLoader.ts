import Innertube, * as InnertubeLib from 'youtubei.js';
import { type Video } from '../dist';

interface BasicInfo {
  src: 'yt' | 'ytmusic';
  title: string;
  channel?: string;
  artist?: string;
  album?: string;
}

export interface ResolvedStreamInfo {
  url: string;
  contentLength?: number;
  bitrate?: number;
  mimeType?: string;
  itag?: number;
}

export interface VideoInfo extends BasicInfo {
  duration: number;
  streamUrl?: any;
  stream?: ResolvedStreamInfo;
}

/**
 * Notes:
 * 
 * `VideoLoader` uses [YouTube.js](https://github.com/LuanRT/YouTube.js) to retrieve video metadata.
 * 
 * ⚠️ Stream URL fetching is disabled because doing so requires executing arbitrary JavaScript.
 * For details, see: https://ytjs.dev/guide/getting-started.html#providing-a-custom-javascript-interpreter
 * The example still functions because `FakePlayer` doesn't actually play anything so it doesn't need
 * the stream URL.
 * 
 * You can enable stream URL fetching in this example by setting `allowArbitraryCodeExecution` below to `true`.
 * If you do so, keep in mind that there is no guard against malicious code execution here.
 * In a real-world application, you should consider sandboxing the executed code. One way would be to use
 * `isolated-vm` as suggested by @BlackCetha: https://github.com/patrickkfkan/yt-cast-receiver/issues/9.
 */

const allowArbitraryCodeExecution = true;

if (allowArbitraryCodeExecution) {
  // Called by Innertube when deciphering stream URLs
  InnertubeLib.Platform.shim.eval = (data: InnertubeLib.Types.BuildScriptResult, env: Record<string, InnertubeLib.Types.VMPrimative>) => {
    const properties = [];

    if(env.n) {
      properties.push(`n: exportedVars.nFunction("${env.n}")`)
    }

    if (env.sig) {
      properties.push(`sig: exportedVars.sigFunction("${env.sig}")`)
    }

    const code = `${data.output}\nreturn { ${properties.join(', ')} }`;

    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return new Function(code)();
  }
}

async function getStream(innertube: Innertube, videoInfo: InnertubeLib.YT.VideoInfo): Promise<ResolvedStreamInfo | null> {
  if (!allowArbitraryCodeExecution) {
    return null;
  }
  if (videoInfo.basic_info.is_live) {
    const url = videoInfo.streaming_data?.hls_manifest_url ||
      videoInfo.streaming_data?.dash_manifest_url;
    return url ? { url } : null;
  }

  try {
    const format = videoInfo.chooseFormat({ type: 'audio', format: 'any', quality: 'best' });
    const url = await format.decipher(innertube.session.player);
    if (!url) return null;
    return {
      url,
      contentLength: format.content_length,
      bitrate: format.bitrate,
      mimeType: format.mime_type,
      itag: format.itag
    };
  }
  catch (_error: unknown) {
    try {
      const format = videoInfo.chooseFormat({ quality: 'best' });
      const url = await format.decipher(innertube.session.player);
      if (!url) return null;
      return {
        url,
        contentLength: format.content_length,
        bitrate: format.bitrate,
        mimeType: format.mime_type,
        itag: format.itag
      };
    }
    catch (_fallbackError: unknown) {
      return null;
    }
  }
}

export default class VideoLoader {

  #innertube: Innertube | null;
  #innertubeInitialClient: InnertubeLib.Context['client'] | null;
  #innertubeTVClient: InnertubeLib.Context['client'] | null;

  constructor() {
    this.#innertube = null;
    this.#innertubeInitialClient = null;
    this.#innertubeTVClient = null;
  }

  async #init() {
    if (!this.#innertube) {
      this.#innertube = await Innertube.create();
      this.#innertubeInitialClient = { ...this.#innertube.session.context.client };
      this.#innertubeTVClient = {
        ...this.#innertube.session.context.client,
        clientName: 'TVHTML5',
        clientVersion: '7.20230405.08.01',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36; SMART-TV; Tizen 4.0,gzip(gfe)'
      };
    }
  }

  async getInfo(video: Video, options?: { minimal?: boolean }): Promise<VideoInfo | null> {
    if (!this.#innertube) {
      await this.#init();
    }
    if (!this.#innertube || !this.#innertubeTVClient || !this.#innertubeInitialClient) {
      throw Error('VideoLoader not initialized');
    }

    const cpn = InnertubeLib.Utils.generateRandomString(16);

    // Prepare request payload
    const payload = {
      cpn,
      videoId: video.id,
      enableMdxAutoplay: true,
      isMdxPlayback: true,
      playbackContext: {
        contentPlaybackContext: {
          signatureTimestamp: this.#innertube.session.player?.signature_timestamp || 0
        }
      }
    } as any;
    if (video.context?.playlistId) {
      payload.playlistId = video.context.playlistId;
    }
    if (video.context?.params) {
      payload.params = video.context.params;
    }
    if (video.context?.index !== undefined) {
      payload.index = video.context.index;
    }

    // Modify innertube session context to indicate we are requesting data as a 'TV' client.
    this.#innertube.session.context.client = this.#innertubeTVClient;

    // Remember to include `ctt` param if available - this is required particularly for private videos.
    if (video.context?.ctt) {
      this.#innertube.session.context.user = {
        enableSafetyMode: false,
        lockedSafetyMode: false,
        credentialTransferTokens: [
          {
            'scope': 'VIDEO',
            'token': video.context?.ctt
          }
        ]
      } as any;
    }
    else {
      delete (this.#innertube.session.context.user as any)?.credentialTransferTokens;
    }

    let basicInfo: BasicInfo | null = null;

    if (!options?.minimal) {
      // '/next' supplies richer metadata (title, channel, artist / album).
      const nextResponse = await this.#innertube.actions.execute('/next', payload) as any;

      // We cannot use innertube to parse `nextResponse`, because it doesn't
      // Have `SingleColumnWatchNextResults` parser class. We would have to do it ourselves.
      const singleColumnContents = nextResponse.data?.contents?.singleColumnWatchNextResults?.
        results?.results?.contents?.[0]?.itemSectionRenderer?.contents?.[0];

      const videoMetadata = singleColumnContents?.videoMetadataRenderer;
      const songMetadata = singleColumnContents?.musicWatchMetadataRenderer;

      if (videoMetadata) {
        basicInfo = {
          src: 'yt',
          title: new InnertubeLib.Misc.Text(videoMetadata.title).toString(),
          channel: new InnertubeLib.Misc.Text(videoMetadata.owner?.videoOwnerRenderer?.title).toString()
        };
      }
      else if (songMetadata) {
        basicInfo = {
          src: 'ytmusic',
          title: new InnertubeLib.Misc.Text(songMetadata.title).toString(),
          artist: new InnertubeLib.Misc.Text(songMetadata.byline).toString(),
          album: new InnertubeLib.Misc.Text(songMetadata.albumName).toString()
        };
      }
    }

    // Fetch response from '/player' endpoint.
    // But first revert to initial client in innertube context, otherwise livestreams will only have DASH manifest URL
    // - we would like to fetch complete streaming data.
    this.#innertube.session.context.client = { ...this.#innertubeInitialClient };
    const playerResponse = await this.#innertube.actions.execute('/player', payload) as any;

    // Wrap it in innertube VideoInfo. Why? Because it offers many useful methods like `chooseFormat()`.
    const innertubeVideoInfo = new InnertubeLib.YT.VideoInfo([ playerResponse ], this.#innertube.actions, cpn);
    const stream = await getStream(this.#innertube, innertubeVideoInfo);

    if (!basicInfo) {
      basicInfo = {
        src: 'yt',
        title: innertubeVideoInfo.basic_info.title || video.id,
        channel: innertubeVideoInfo.basic_info.author
      };
    }

    return {
      ...basicInfo,
      duration: innertubeVideoInfo.basic_info.duration || 0,
      streamUrl: stream?.url,
      stream: stream ?? undefined
    } as VideoInfo;
  }
}
