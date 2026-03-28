[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / Player

# Abstract Class: Player

Defined in: [src/lib/Player.ts:46](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L46)

`Player` abstract class that leaves playback functionality to implementors.

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new Player**(): `Player`

Defined in: [src/lib/Player.ts:117](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L117)

#### Returns

`Player`

#### Overrides

`EventEmitter.constructor`

## Accessors

### autoplayMode

#### Get Signature

> **get** **autoplayMode**(): [`AutoplayMode`](../type-aliases/AutoplayMode.md)

Defined in: [src/lib/Player.ts:384](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L384)

##### Returns

[`AutoplayMode`](../type-aliases/AutoplayMode.md)

***

### cpn

#### Get Signature

> **get** **cpn**(): `string`

Defined in: [src/lib/Player.ts:388](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L388)

##### Returns

`string`

***

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

Defined in: [src/lib/Player.ts:376](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L376)

##### Returns

[`Logger`](../interfaces/Logger.md)

***

### queue

#### Get Signature

> **get** **queue**(): [`Playlist`](Playlist.md)

Defined in: [src/lib/Player.ts:392](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L392)

##### Returns

[`Playlist`](Playlist.md)

***

### status

#### Get Signature

> **get** **status**(): [`PlayerStatus`](../type-aliases/PlayerStatus.md)

Defined in: [src/lib/Player.ts:380](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L380)

##### Returns

[`PlayerStatus`](../type-aliases/PlayerStatus.md)

***

### zeroVolumeLevelOnMute

#### Get Signature

> **get** **zeroVolumeLevelOnMute**(): `boolean`

Defined in: [src/lib/Player.ts:396](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L396)

##### Returns

`boolean`

## Methods

### doGetDuration()

> `abstract` `protected` **doGetDuration**(): `Promise`\<`number`\>

Defined in: [src/lib/Player.ts:115](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L115)

Implementations shall return the duration of the current video.

#### Returns

`Promise`\<`number`\>

Promise that resolves to the duration of the current video (in seconds).

***

### doGetPosition()

> `abstract` `protected` **doGetPosition**(): `Promise`\<`number`\>

Defined in: [src/lib/Player.ts:109](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L109)

Implementations shall return the current playback position.

#### Returns

`Promise`\<`number`\>

Promise that resolves to the current playback position (in seconds).

***

### doGetVolume()

> `abstract` `protected` **doGetVolume**(): `Promise`\<[`Volume`](../interfaces/Volume.md)\>

Defined in: [src/lib/Player.ts:103](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L103)

Implementations shall return the current volume level and muted state.

#### Returns

`Promise`\<[`Volume`](../interfaces/Volume.md)\>

Promise that resolves to an object with these properties:
  - `level`: (number) volume level between 0-100.
  - `muted`: (boolean) muted state.

***

### doPause()

> `abstract` `protected` **doPause**(): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:66](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L66)

Implementations shall pause current playback.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` when playback was paused; `false` otherwise.

***

### doPlay()

> `abstract` `protected` **doPlay**(`video`, `position`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:60](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L60)

Implementations shall play the target video from the specified position.

#### Parameters

##### video

[`Video`](../interfaces/Video.md)

The target video to play.

##### position

`number`

The position, in seconds, from which to start playback.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` on successful playback; `false` otherwise.

***

### doResume()

> `abstract` `protected` **doResume**(): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:72](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L72)

Implementations shall resume paused playback.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` when playback was resumed; `false` otherwise.

***

### doSeek()

> `abstract` `protected` **doSeek**(`position`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:86](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L86)

Implementations shall seek to the specified position.

#### Parameters

##### position

`number`

The position, in seconds, to seek to.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` if seek operation was successful; `false` otherwise.

***

### doSetVolume()

> `abstract` `protected` **doSetVolume**(`volume`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:95](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L95)

Implementations shall set the volume level and muted state to the values specified in the `volume` object param.

#### Parameters

##### volume

[`Volume`](../interfaces/Volume.md)

(object)
  - `level`: (number) volume level between 0-100.
  - `muted`: (boolean) muted state.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` when volume was set; `false` otherwise.

***

### doStop()

> `abstract` `protected` **doStop**(): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:79](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L79)

Implementations shall stop current playback or cancel any pending playback (such as when
a video is still being loaded).

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` when playback was stopped or pending playback was cancelled; `false` otherwise.

***

### getDuration()

> **getDuration**(): `Promise`\<`number`\>

Defined in: [src/lib/Player.ts:360](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L360)

Calls `doGetDuration()`

#### Returns

`Promise`\<`number`\>

Promise returned by `doGetDuration()`.

***

### getNavInfo()

> **getNavInfo**(): [`PlayerNavInfo`](../interfaces/PlayerNavInfo.md)

Defined in: [src/lib/Player.ts:400](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L400)

#### Returns

[`PlayerNavInfo`](../interfaces/PlayerNavInfo.md)

***

### getPosition()

> **getPosition**(): `Promise`\<`number`\>

Defined in: [src/lib/Player.ts:352](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L352)

Calls `doGetPosition()`.

#### Returns

`Promise`\<`number`\>

Promise returned by `doGetPosition()`.

***

### getState()

> **getState**(): `Promise`\<[`PlayerState`](../interfaces/PlayerState.md)\>

Defined in: [src/lib/Player.ts:408](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L408)

#### Returns

`Promise`\<[`PlayerState`](../interfaces/PlayerState.md)\>

***

### getVolume()

> **getVolume**(): `Promise`\<[`Volume`](../interfaces/Volume.md)\>

Defined in: [src/lib/Player.ts:340](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L340)

Calls `doGetVolume()`.

#### Returns

`Promise`\<[`Volume`](../interfaces/Volume.md)\>

Promise that resolves to the resolved result of `doGetVolume()`.

***

### next()

> **next**(`AID?`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:251](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L251)

Plays the next video in the player queue. If already reached end of queue,
play autoplay video if available. Notifies senders on successful playback.

#### Parameters

##### AID?

Internal use; do not specify.

`number` | `null`

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` on playback of the next video; `false` otherwise.

***

### notifyExternalStateChange()

> **notifyExternalStateChange**(`newStatus?`): `Promise`\<`void`\>

Defined in: [src/lib/Player.ts:439](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L439)

Signals that there has been a change in player state that is not captured elsewhere
in the `Player` implementation. This method will update the `Player` instance's
internal state and, if necessary, notifies senders of the new player state.

#### Parameters

##### newStatus?

[`PlayerStatus`](../type-aliases/PlayerStatus.md)

The new player status; `undefined` for no change in player status.

#### Returns

`Promise`\<`void`\>

***

### pause()

> **pause**(`AID?`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:164](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L164)

Calls `doPause()`; if returned Promise resolves to `true`, notifies connected senders that playback has paused.

#### Parameters

##### AID?

Internal use; do not specify.

`number` | `null`

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doPause()`, or `false` if no playback is in progress.

***

### play()

> **play**(`video`, `position?`, `AID?`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:141](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L141)

Notifies senders that player is in 'loading' state, then calls `doPlay()`;
if returned Promise resolves to `true`, notifies senders that playback has started.

#### Parameters

##### video

[`Video`](../interfaces/Video.md)

The target video to play.

##### position?

`number`

The position (in seconds) from which to start playback.

##### AID?

Internal use; do not specify.

`number` | `null`

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doPlay()`.

***

### previous()

> **previous**(`AID?`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:283](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L283)

Plays the previous video in the player queue. Notifies senders on successful playback.

#### Parameters

##### AID?

Internal use; do not specify.

`number` | `null`

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` on playback of the previous video; `false` otherwise.

***

### reset()

> **reset**(`AID?`): `Promise`\<`void`\>

Defined in: [src/lib/Player.ts:327](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L327)

Resets the player to Idle state.

#### Parameters

##### AID?

Internal use; do not specify.

`number` | `null`

#### Returns

`Promise`\<`void`\>

***

### resume()

> **resume**(`AID?`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:181](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L181)

Calls `doResume()`; if returned Promise resolves to `true`, notifies connected senders that playback has resumed.

#### Parameters

##### AID?

Internal use; do not specify.

`number` | `null`

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doResume()`, or `false` if player is not in paused state.

***

### seek()

> **seek**(`position`, `AID?`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:225](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L225)

Calls `doSeek()`; if returned Promise resolves to `true`, notifies connected senders of new seek position.

#### Parameters

##### position

`number`

The position, in seconds, to seek to.

##### AID?

Internal use; do not specify.

`number` | `null`

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doSeek()`; `false` if no playback is in progress or otherwise not in paused state.

***

### setVolume()

> **setVolume**(`volume`, `AID?`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:307](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L307)

Calls `doSetVolume()`; if returned Promise resolves to `true`, notifies connected senders of new volume level.

#### Parameters

##### volume

[`Volume`](../interfaces/Volume.md)

(object)
  - `level`: (number) volume level between 0-100.
  - `muted`: (boolean) muted state.

##### AID?

Internal use; do not specify.

`number` | `null`

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doSetVolume()`.

***

### stop()

> **stop**(`AID?`): `Promise`\<`boolean`\>

Defined in: [src/lib/Player.ts:206](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L206)

Calls `doStop()`; if returned Promise resolves to `true`, notifies connected senders that playback has stopped.

#### Parameters

##### AID?

Internal use; do not specify.

`number` | `null`

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to the result of `doStop()`; `true` if player already in stopped or idle state.

## Events

### on()

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/Player.ts:444](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L444)

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

`string` | `symbol`

###### listener

(...`args`) => `void`

The callback function

##### Returns

`this`

##### Since

v0.1.101

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/Player.ts:450](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/Player.ts#L450)

Emitted when there has been a change in player state.

##### Parameters

###### event

`"state"`

###### listener

(`data`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`
