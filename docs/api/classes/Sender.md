[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / Sender

# Class: Sender

Defined in: [src/lib/app/Sender.ts:8](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L8)

A `Sender` object holds information about a sender.

## Properties

### app

> **app**: `string` \| `null`

Defined in: [src/lib/app/Sender.ts:11](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L11)

***

### capabilities

> **capabilities**: `string`[]

Defined in: [src/lib/app/Sender.ts:13](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L13)

***

### client

> **client**: [`Client`](../interfaces/Client.md) \| `null`

Defined in: [src/lib/app/Sender.ts:12](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L12)

***

### device

> **device**: `Record`\<`string`, `any`\>

Defined in: [src/lib/app/Sender.ts:14](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L14)

***

### id

> **id**: `string`

Defined in: [src/lib/app/Sender.ts:9](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L9)

***

### name

> **name**: `string`

Defined in: [src/lib/app/Sender.ts:10](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L10)

***

### obfuscatedGaiaId

> **obfuscatedGaiaId**: `string` \| `null`

Defined in: [src/lib/app/Sender.ts:19](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L19)

***

### ownerObfuscatedGaiaId

> **ownerObfuscatedGaiaId**: `string` \| `null`

Defined in: [src/lib/app/Sender.ts:20](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L20)

***

### user?

> `optional` **user**: `object`

Defined in: [src/lib/app/Sender.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L15)

#### name

> **name**: `string`

#### thumbnail

> **thumbnail**: `string`

## Methods

### supportsAutoplay()

> **supportsAutoplay**(): `boolean`

Defined in: [src/lib/app/Sender.ts:61](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L61)

#### Returns

`boolean`

***

### supportsMute()

> **supportsMute**(): `boolean`

Defined in: [src/lib/app/Sender.ts:65](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/app/Sender.ts#L65)

#### Returns

`boolean`
