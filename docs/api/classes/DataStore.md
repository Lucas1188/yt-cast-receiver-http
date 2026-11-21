[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / DataStore

# Abstract Class: DataStore

Defined in: [src/lib/utils/DataStore.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DataStore.ts#L3)

## Extended by

- [`DefaultDataStore`](DefaultDataStore.md)

## Constructors

### Constructor

> **new DataStore**(): `DataStore`

#### Returns

`DataStore`

## Accessors

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

Defined in: [src/lib/utils/DataStore.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DataStore.ts#L15)

##### Returns

[`Logger`](../interfaces/Logger.md)

## Methods

### get()

> `abstract` **get**\<`T`\>(`key`): `Promise`\<`T` \| `null`\>

Defined in: [src/lib/utils/DataStore.ts:13](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DataStore.ts#L13)

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`T` \| `null`\>

***

### set()

> `abstract` **set**\<`T`\>(`key`, `value`): `Promise`\<`void`\>

Defined in: [src/lib/utils/DataStore.ts:12](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DataStore.ts#L12)

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`Promise`\<`void`\>

***

### setLogger()

> **setLogger**(`logger`): `void`

Defined in: [src/lib/utils/DataStore.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DataStore.ts#L7)

#### Parameters

##### logger

[`Logger`](../interfaces/Logger.md)

#### Returns

`void`
