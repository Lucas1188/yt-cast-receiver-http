[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / YouTubeCastReceiverError

# Class: YouTubeCastReceiverError

Defined in: [src/lib/utils/Errors.ts:1](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L1)

## Extends

- `Error`

## Extended by

- [`ConnectionError`](ConnectionError.md)
- [`AbortError`](AbortError.md)
- [`BadResponseError`](BadResponseError.md)
- [`DataError`](DataError.md)
- [`IncompleteAPIDataError`](IncompleteAPIDataError.md)
- [`SessionError`](SessionError.md)
- [`AppError`](AppError.md)
- [`DialServerError`](DialServerError.md)
- [`SenderConnectionError`](SenderConnectionError.md)

## Constructors

### Constructor

> **new YouTubeCastReceiverError**(`message`, `cause?`, `info?`): `YouTubeCastReceiverError`

Defined in: [src/lib/utils/Errors.ts:6](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L6)

#### Parameters

##### message

`string`

##### cause?

`any`

##### info?

`Record`\<`string`, `any`\>

#### Returns

`YouTubeCastReceiverError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `any`

Defined in: [src/lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L3)

***

### info?

> `optional` **info**: `Record`\<`string`, `any`\>

Defined in: [src/lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses()

> **getCauses**(): `any`[]

Defined in: [src/lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L17)

#### Returns

`any`[]
