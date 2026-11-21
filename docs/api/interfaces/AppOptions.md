[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / AppOptions

# Interface: AppOptions

Defined in: [src/lib/app/YouTubeApp.ts:20](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L20)

## Properties

### brand?

> `optional` **brand**: `string`

Defined in: [src/lib/app/YouTubeApp.ts:30](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L30)

#### Default

```ts
CONF_DEFAULTS.BRAND
```

***

### dataStore

> **dataStore**: [`DataStore`](../classes/DataStore.md) \| `null`

Defined in: [src/lib/app/YouTubeApp.ts:52](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L52)

***

### enableAutoplayOnConnect?

> `optional` **enableAutoplayOnConnect**: `boolean`

Defined in: [src/lib/app/YouTubeApp.ts:38](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L38)

#### Default

```ts
true
```

***

### logger

> **logger**: [`Logger`](Logger.md)

Defined in: [src/lib/app/YouTubeApp.ts:54](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L54)

***

### model?

> `optional` **model**: `string`

Defined in: [src/lib/app/YouTubeApp.ts:34](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L34)

#### Default

```ts
CONF_DEFAULTS.MODEL
```

***

### mutePolicy?

> `optional` **mutePolicy**: `ValueOf`\<\{ `AUTO`: `"auto"`; `PRESERVE_VOLUME_LEVEL`: `"preserveLevel"`; `ZERO_VOLUME_LEVEL`: `"zeroLevel"`; \}\>

Defined in: [src/lib/app/YouTubeApp.ts:42](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L42)

#### Default

```ts
MUTE_POLICIES.AUTO
```

***

### playlistRequestHandler?

> `optional` **playlistRequestHandler**: [`PlaylistRequestHandler`](../classes/PlaylistRequestHandler.md)

Defined in: [src/lib/app/YouTubeApp.ts:50](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L50)

#### Default

`DefaultPlaylistRequestHandler` instance

***

### resetPlayerOnDisconnectPolicy?

> `optional` **resetPlayerOnDisconnectPolicy**: `ValueOf`\<\{ `ALL_DISCONNECTED`: `"allDisconnected"`; `ALL_EXPLICITLY_DISCONNECTED`: `"allExplicitlyDisconnected"`; \}\>

Defined in: [src/lib/app/YouTubeApp.ts:46](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L46)

#### Default

```ts
RESET_PLAYER_ON_DISCONNECT_POLICIES.ALL_DISCONNECTED
```

***

### screenApp?

> `optional` **screenApp**: `string`

Defined in: [src/lib/app/YouTubeApp.ts:26](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L26)

#### Default

```ts
CONF_DEFAULTS.SCREEN_APP
```

***

### screenName

> **screenName**: `string`

Defined in: [src/lib/app/YouTubeApp.ts:22](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/YouTubeApp.ts#L22)
