[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / PairingCodeRequestService

# Class: PairingCodeRequestService

Defined in: [src/lib/app/PairingCodeRequestService.ts:32](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PairingCodeRequestService.ts#L32)

Fetches pairing code for manual pairing (aka 'Link with TV code').
A pairing code is refreshed every 5 minutes. Results are returned through
the `response` event.

### Usage

```
const service = receiver.getPairingCodeRequestService();

service.on('request', () => {...});  // Event when request is being made
service.on('response', (code) => {...}); // Event when code is obtained
service.on('error', (error) => {...}); // Event when error occurs

service.start();
...

service.stop();
```

Note that the service stops on `error` event.

## Extends

- `EventEmitter`

## Accessors

### status

#### Get Signature

> **get** **status**(): `"stopped"` \| `"running"`

Defined in: [src/lib/app/PairingCodeRequestService.ts:159](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PairingCodeRequestService.ts#L159)

Service status

##### Returns

`"stopped"` \| `"running"`

## Methods

### start()

> **start**(): `void`

Defined in: [src/lib/app/PairingCodeRequestService.ts:53](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PairingCodeRequestService.ts#L53)

Starts the service.

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Defined in: [src/lib/app/PairingCodeRequestService.ts:65](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PairingCodeRequestService.ts#L65)

Stops the service.

#### Returns

`void`

## Events

### on()

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/app/PairingCodeRequestService.ts:140](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PairingCodeRequestService.ts#L140)

Emitted when service is requesting pairing code.

##### Parameters

###### event

`"request"`

###### listener

() => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/app/PairingCodeRequestService.ts:146](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PairingCodeRequestService.ts#L146)

Emitted when service has obtained pairing code.

##### Parameters

###### event

`"response"`

###### listener

(`code`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [src/lib/app/PairingCodeRequestService.ts:152](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/PairingCodeRequestService.ts#L152)

Emitted when service encountered error. The service stops on this event.

##### Parameters

###### event

`"error"`

###### listener

(`error`) => `void`

##### Returns

`this`

##### Overrides

`EventEmitter.on`
