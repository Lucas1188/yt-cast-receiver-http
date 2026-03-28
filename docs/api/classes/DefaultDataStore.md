[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / DefaultDataStore

# Class: DefaultDataStore

Defined in: [src/lib/utils/DefaultDataStore.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultDataStore.ts#L7)

Default `DataStore` implementation that uses [node-persist](https://github.com/simonlast/node-persist) to persist data.

## Extends

- [`DataStore`](DataStore.md)

## Constructors

### Constructor

> **new DefaultDataStore**(): `DefaultDataStore`

Defined in: [src/lib/utils/DefaultDataStore.ts:11](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultDataStore.ts#L11)

#### Returns

`DefaultDataStore`

#### Overrides

[`DataStore`](DataStore.md).[`constructor`](DataStore.md#constructor)

## Accessors

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

Defined in: [src/lib/utils/DataStore.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DataStore.ts#L15)

##### Returns

[`Logger`](../interfaces/Logger.md)

#### Inherited from

[`DataStore`](DataStore.md).[`logger`](DataStore.md#logger)

## Methods

### clear()

> **clear**(): `Promise`\<`void`\>

Defined in: [src/lib/utils/DefaultDataStore.ts:37](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultDataStore.ts#L37)

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**\<`T`\>(`key`): `Promise`\<`T` \| `null`\>

Defined in: [src/lib/utils/DefaultDataStore.ts:27](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultDataStore.ts#L27)

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`T` \| `null`\>

#### Overrides

[`DataStore`](DataStore.md).[`get`](DataStore.md#get)

***

### set()

> **set**\<`T`\>(`key`, `value`): `Promise`\<`void`\>

Defined in: [src/lib/utils/DefaultDataStore.ts:18](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultDataStore.ts#L18)

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

#### Overrides

[`DataStore`](DataStore.md).[`set`](DataStore.md#set)

***

### setLogger()

> **setLogger**(`logger`): `void`

Defined in: [src/lib/utils/DataStore.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DataStore.ts#L7)

#### Parameters

##### logger

[`Logger`](../interfaces/Logger.md)

#### Returns

`void`

#### Inherited from

[`DataStore`](DataStore.md).[`setLogger`](DataStore.md#setlogger)
