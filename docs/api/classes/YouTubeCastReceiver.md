[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / YouTubeCastReceiver

# Class: YouTubeCastReceiver

Defined in: [src/lib/YouTubeCastReceiver.ts:64](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L64)

Main class of `yt-cast-receiver` library.

To create a `YouTubeCastReceiver` instance, you need to provide at least a
[Player](Player.md) implementation.

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new YouTubeCastReceiver**(`player`, `options`): `YouTubeCastReceiver`

Defined in: [src/lib/YouTubeCastReceiver.ts:71](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L71)

#### Parameters

##### player

[`Player`](Player.md)

##### options

[`YouTubeCastReceiverOptions`](../interfaces/YouTubeCastReceiverOptions.md) = `{}`

#### Returns

`YouTubeCastReceiver`

#### Overrides

`EventEmitter.constructor`

## Accessors

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

Defined in: [src/lib/YouTubeCastReceiver.ts:207](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L207)

##### Returns

[`Logger`](../interfaces/Logger.md)

***

### status

#### Get Signature

> **get** **status**(): [`YouTubeCastReceiverStatus`](../type-aliases/YouTubeCastReceiverStatus.md)

Defined in: [src/lib/YouTubeCastReceiver.ts:203](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L203)

##### Returns

[`YouTubeCastReceiverStatus`](../type-aliases/YouTubeCastReceiverStatus.md)

## Methods

### emit()

#### Call Signature

> **emit**(`event`, `error`): `boolean`

Defined in: [src/lib/YouTubeCastReceiver.ts:211](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L211)

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import EventEmitter from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

##### Parameters

###### event

`"error"`

###### error

`Error`

##### Returns

`boolean`

##### Since

v0.1.26

##### Overrides

`EventEmitter.emit`

#### Call Signature

> **emit**(`event`, `error`): `boolean`

Defined in: [src/lib/YouTubeCastReceiver.ts:212](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L212)

##### Parameters

###### event

`"terminate"`

###### error

`Error`

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

#### Call Signature

> **emit**(`event`, `sender`): `boolean`

Defined in: [src/lib/YouTubeCastReceiver.ts:213](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L213)

##### Parameters

###### event

`"senderConnect"`

###### sender

[`Sender`](Sender.md)

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

#### Call Signature

> **emit**(`event`, `sender`, `implicit`): `boolean`

Defined in: [src/lib/YouTubeCastReceiver.ts:214](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L214)

##### Parameters

###### event

`"senderDisconnect"`

###### sender

[`Sender`](Sender.md)

###### implicit

`boolean`

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

***

### enableAutoplayOnConnect()

> **enableAutoplayOnConnect**(`value`): `void`

Defined in: [src/lib/YouTubeCastReceiver.ts:183](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L183)

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### getConnectedSenders()

> **getConnectedSenders**(): [`Sender`](Sender.md)[]

Defined in: [src/lib/YouTubeCastReceiver.ts:199](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L199)

#### Returns

[`Sender`](Sender.md)[]

***

### getPairingCodeRequestService()

> **getPairingCodeRequestService**(): [`PairingCodeRequestService`](PairingCodeRequestService.md)

Defined in: [src/lib/YouTubeCastReceiver.ts:195](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L195)

#### Returns

[`PairingCodeRequestService`](PairingCodeRequestService.md)

***

### setLogLevel()

> **setLogLevel**(`value`): `void`

Defined in: [src/lib/YouTubeCastReceiver.ts:191](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L191)

#### Parameters

##### value

[`LogLevel`](../type-aliases/LogLevel.md)

#### Returns

`void`

***

### setResetPlayerOnDisconnectPolicy()

> **setResetPlayerOnDisconnectPolicy**(`value`): `void`

Defined in: [src/lib/YouTubeCastReceiver.ts:187](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L187)

#### Parameters

##### value

`ValueOf`\<\{ `ALL_DISCONNECTED`: `"allDisconnected"`; `ALL_EXPLICITLY_DISCONNECTED`: `"allExplicitlyDisconnected"`; \}\>

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [src/lib/YouTubeCastReceiver.ts:133](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L133)

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [src/lib/YouTubeCastReceiver.ts:164](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L164)

#### Returns

`Promise`\<`void`\>

## Events

### on()

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/YouTubeCastReceiver.ts:224](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L224)

Emitted when the `YouTubeApp` instance has terminated due to irrecoverable error.

##### Parameters

###### event

`"terminate"`

###### listener

(`error`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/YouTubeCastReceiver.ts:230](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L230)

Emitted when an error has occurred.

##### Parameters

###### event

`"error"`

###### listener

(`error`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/YouTubeCastReceiver.ts:236](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L236)

Emitted when a sender has disconnected.

##### Parameters

###### event

`"senderDisconnect"`

###### listener

(`sender`, `implicit`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/YouTubeCastReceiver.ts:242](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L242)

Emitted when a sender has connected.

##### Parameters

###### event

`"senderConnect"`

###### listener

(`sender`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`
