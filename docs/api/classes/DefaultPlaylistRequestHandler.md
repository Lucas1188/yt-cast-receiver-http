[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / DefaultPlaylistRequestHandler

# Class: DefaultPlaylistRequestHandler

Defined in: [src/lib/app/DefaultPlaylistRequestHandler.ts:27](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/DefaultPlaylistRequestHandler.ts#L27)

Default implementation of the `PlaylistRequestHandler` abstract class.
Uses [YouTube.js](https://github.com/LuanRT/YouTube.js) for fetching data
from YouTube.

## Extends

- [`PlaylistRequestHandler`](PlaylistRequestHandler.md)

## Constructors

### Constructor

> **new DefaultPlaylistRequestHandler**(`params`): `DefaultPlaylistRequestHandler`

Defined in: [src/lib/app/DefaultPlaylistRequestHandler.ts:35](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/DefaultPlaylistRequestHandler.ts#L35)

#### Parameters

##### params

###### getConnectedSendersFn

() => [`Sender`](Sender.md)[]

#### Returns

`DefaultPlaylistRequestHandler`

#### Overrides

[`PlaylistRequestHandler`](PlaylistRequestHandler.md).[`constructor`](PlaylistRequestHandler.md#constructor)

## Accessors

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

Defined in: [src/lib/app/PlaylistRequestHandler.ts:65](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PlaylistRequestHandler.ts#L65)

##### Returns

[`Logger`](../interfaces/Logger.md)

#### Inherited from

[`PlaylistRequestHandler`](PlaylistRequestHandler.md).[`logger`](PlaylistRequestHandler.md#logger)

## Methods

### getPreviousNextVideos()

> **getPreviousNextVideos**(`target`, `playlist`): `Promise`\<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

Defined in: [src/lib/app/DefaultPlaylistRequestHandler.ts:61](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/DefaultPlaylistRequestHandler.ts#L61)

Given `target` video that resides in `playlist`, implementations shall fetch
the previous and next videos in the list.

If `target` is already the last video in the list, then fetch the autoplay video
in lieu of next video. You may optionally check first whether autoplay is enabled
with `playlist.autoplayMode`, and return `null` for next video if it is not.
The object returned by this method shall have the following properties:
- `previous`: object representing the previous video in the list, or `null` if there is none.
- `next`: object representing the next video in the list or autoplay video, as the case may be, or `null` if there is none.
Instead of `null`, you may simply omit `previous` or `next` from the returned result. But if provided, they
must satisfy the [Video](../interfaces/Video.md) interface constraint.

#### Parameters

##### target

[`Video`](../interfaces/Video.md)

Target video for which the previous and next videos are obtained.

##### playlist

[`Playlist`](Playlist.md)

The `Playlist` instance making the request.

#### Returns

`Promise`\<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

(Object)

#### Overrides

[`PlaylistRequestHandler`](PlaylistRequestHandler.md).[`getPreviousNextVideos`](PlaylistRequestHandler.md#getpreviousnextvideos)

***

### getPreviousNextVideosAbortable()

> **getPreviousNextVideosAbortable**(`target`, `playlist`, `abortSignal`): `Promise`\<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

Defined in: [src/lib/app/PlaylistRequestHandler.ts:21](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PlaylistRequestHandler.ts#L21)

#### Parameters

##### target

[`Video`](../interfaces/Video.md)

##### playlist

[`Playlist`](Playlist.md)

##### abortSignal

`AbortSignal`

#### Returns

`Promise`\<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

#### Inherited from

[`PlaylistRequestHandler`](PlaylistRequestHandler.md).[`getPreviousNextVideosAbortable`](PlaylistRequestHandler.md#getpreviousnextvideosabortable)

***

### markWatched()

> **markWatched**(`video`, `run`): `Promise`\<`void`\>

Defined in: [src/lib/app/DefaultPlaylistRequestHandler.ts:223](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/DefaultPlaylistRequestHandler.ts#L223)

#### Parameters

##### video

[`Video`](../interfaces/Video.md)

##### run

`1` | `2`

#### Returns

`Promise`\<`void`\>

***

### reset()

> **reset**(): `void`

Defined in: [src/lib/app/DefaultPlaylistRequestHandler.ts:293](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/DefaultPlaylistRequestHandler.ts#L293)

Resets the handler to its initial state. By default, this method does nothing.
Implementations shall override this method if need be.

#### Returns

`void`

#### Overrides

[`PlaylistRequestHandler`](PlaylistRequestHandler.md).[`reset`](PlaylistRequestHandler.md#reset)

***

### setLogger()

> **setLogger**(`logger`): `void`

Defined in: [src/lib/app/PlaylistRequestHandler.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PlaylistRequestHandler.ts#L17)

#### Parameters

##### logger

[`Logger`](../interfaces/Logger.md)

#### Returns

`void`

#### Inherited from

[`PlaylistRequestHandler`](PlaylistRequestHandler.md).[`setLogger`](PlaylistRequestHandler.md#setlogger)
