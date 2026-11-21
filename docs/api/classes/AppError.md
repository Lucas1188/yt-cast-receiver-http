[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / AppError

# Class: AppError

Defined in: [src/lib/utils/Errors.ts:70](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L70)

## Extends

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

## Constructors

### Constructor

> **new AppError**(`message`, `cause?`): `AppError`

Defined in: [src/lib/utils/Errors.ts:71](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L71)

#### Parameters

##### message

`string`

##### cause?

`any`

#### Returns

`AppError`

#### Overrides

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`constructor`](YouTubeCastReceiverError.md#constructor)

## Properties

### cause?

> `optional` **cause**: `any`

Defined in: [src/lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L3)

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`cause`](YouTubeCastReceiverError.md#cause)

***

### info?

> `optional` **info**: `Record`\<`string`, `any`\>

Defined in: [src/lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L4)

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`info`](YouTubeCastReceiverError.md#info)

## Methods

### getCauses()

> **getCauses**(): `any`[]

Defined in: [src/lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/Errors.ts#L17)

#### Returns

`any`[]

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`getCauses`](YouTubeCastReceiverError.md#getcauses)
