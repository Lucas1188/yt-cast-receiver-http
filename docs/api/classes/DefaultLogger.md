[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / DefaultLogger

# Class: DefaultLogger

Defined in: [src/lib/utils/DefaultLogger.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L15)

## Implements

- [`Logger`](../interfaces/Logger.md)

## Constructors

### Constructor

> **new DefaultLogger**(`color`): `DefaultLogger`

Defined in: [src/lib/utils/DefaultLogger.ts:20](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L20)

#### Parameters

##### color

`boolean` = `true`

#### Returns

`DefaultLogger`

## Properties

### color

> `protected` **color**: `boolean`

Defined in: [src/lib/utils/DefaultLogger.ts:18](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L18)

***

### level

> `protected` **level**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [src/lib/utils/DefaultLogger.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L17)

## Methods

### checkLevel()

> `protected` **checkLevel**(`targetLevel`): `boolean`

Defined in: [src/lib/utils/DefaultLogger.ts:45](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L45)

#### Parameters

##### targetLevel

[`LogLevel`](../type-aliases/LogLevel.md)

#### Returns

`boolean`

***

### debug()

> **debug**(...`msg`): `void`

Defined in: [src/lib/utils/DefaultLogger.ts:37](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L37)

#### Parameters

##### msg

...`any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`debug`](../interfaces/Logger.md#debug)

***

### error()

> **error**(...`msg`): `void`

Defined in: [src/lib/utils/DefaultLogger.ts:25](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L25)

#### Parameters

##### msg

...`any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`error`](../interfaces/Logger.md#error)

***

### info()

> **info**(...`msg`): `void`

Defined in: [src/lib/utils/DefaultLogger.ts:33](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L33)

#### Parameters

##### msg

...`any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`info`](../interfaces/Logger.md#info)

***

### process()

> `protected` **process**(`targetLevel`, `msg`): `void`

Defined in: [src/lib/utils/DefaultLogger.ts:49](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L49)

#### Parameters

##### targetLevel

[`LogLevel`](../type-aliases/LogLevel.md)

##### msg

`any`[]

#### Returns

`void`

***

### setLevel()

> **setLevel**(`value`): `void`

Defined in: [src/lib/utils/DefaultLogger.ts:41](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L41)

#### Parameters

##### value

[`LogLevel`](../type-aliases/LogLevel.md)

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`setLevel`](../interfaces/Logger.md#setlevel)

***

### toOutput()

> `protected` **toOutput**(`targetLevel`, `msg`): `void`

Defined in: [src/lib/utils/DefaultLogger.ts:88](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L88)

#### Parameters

##### targetLevel

[`LogLevel`](../type-aliases/LogLevel.md)

##### msg

`string`[]

#### Returns

`void`

***

### toStrings()

> `protected` **toStrings**(`msg`): `string`[]

Defined in: [src/lib/utils/DefaultLogger.ts:55](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L55)

#### Parameters

##### msg

`any`[]

#### Returns

`string`[]

***

### warn()

> **warn**(...`msg`): `void`

Defined in: [src/lib/utils/DefaultLogger.ts:29](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/utils/DefaultLogger.ts#L29)

#### Parameters

##### msg

...`any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`warn`](../interfaces/Logger.md#warn)
