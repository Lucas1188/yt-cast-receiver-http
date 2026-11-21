[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / Playlist

# Class: Playlist

Defined in: [src/lib/app/Playlist.ts:45](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L45)

Representation of the player queue.

## Extends

- `EventEmitter`

## Accessors

### autoplay

#### Get Signature

> **get** **autoplay**(): [`Video`](../interfaces/Video.md) \| `null`

Defined in: [src/lib/app/Playlist.ts:332](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L332)

##### Returns

[`Video`](../interfaces/Video.md) \| `null`

***

### autoplayMode

#### Get Signature

> **get** **autoplayMode**(): [`AutoplayMode`](../type-aliases/AutoplayMode.md)

Defined in: [src/lib/app/Playlist.ts:343](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L343)

##### Returns

[`AutoplayMode`](../type-aliases/AutoplayMode.md)

***

### current

#### Get Signature

> **get** **current**(): [`Video`](../interfaces/Video.md) \| `null`

Defined in: [src/lib/app/Playlist.ts:339](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L339)

##### Returns

[`Video`](../interfaces/Video.md) \| `null`

***

### hasNext

#### Get Signature

> **get** **hasNext**(): `boolean`

Defined in: [src/lib/app/Playlist.ts:356](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L356)

##### Returns

`boolean`

***

### hasPrevious

#### Get Signature

> **get** **hasPrevious**(): `boolean`

Defined in: [src/lib/app/Playlist.ts:352](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L352)

##### Returns

`boolean`

***

### id

#### Get Signature

> **get** **id**(): `string` \| `null`

Defined in: [src/lib/app/Playlist.ts:272](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L272)

Id of the playlist.

##### Returns

`string` \| `null`

***

### isLast

#### Get Signature

> **get** **isLast**(): `boolean`

Defined in: [src/lib/app/Playlist.ts:347](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L347)

##### Returns

`boolean`

***

### isUpdating

#### Get Signature

> **get** **isUpdating**(): `boolean`

Defined in: [src/lib/app/Playlist.ts:363](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L363)

##### Returns

`boolean`

***

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [src/lib/app/Playlist.ts:286](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L286)

The number of videos in the playlist.

##### Returns

`number`

***

### videoIds

#### Get Signature

> **get** **videoIds**(): `string`[]

Defined in: [src/lib/app/Playlist.ts:279](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L279)

The Ids of the videos in the playlist.

##### Returns

`string`[]

## Methods

### getState()

> **getState**(): [`PlaylistState`](../interfaces/PlaylistState.md)

Defined in: [src/lib/app/Playlist.ts:310](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L310)

#### Returns

[`PlaylistState`](../interfaces/PlaylistState.md)

***

### on()

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/app/Playlist.ts:374](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L374)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName` and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

##### Parameters

###### event

`"autoplayModeChange"`

###### listener

(`previous`, `current`) => `void`

The callback function

##### Returns

`this`

##### Since

v0.1.101

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/app/Playlist.ts:375](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L375)

##### Parameters

###### event

`"playlistUpdated"`

###### listener

(`event`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/app/Playlist.ts:376](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L376)

##### Parameters

###### event

`"playlistCleared"`

###### listener

(`event`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/app/Playlist.ts:377](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L377)

##### Parameters

###### event

`"videoSelected"` | `"videoAdded"` | `"videoRemoved"`

###### listener

(`event`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/app/Playlist.ts:378](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Playlist.ts#L378)

##### Parameters

###### event

`"playlistSet"` | `"playlistAdded"`

###### listener

(`event`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`
