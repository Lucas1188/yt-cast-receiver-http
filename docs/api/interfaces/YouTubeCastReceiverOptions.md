[**yt-cast-receiver**](../README.md)

***

[yt-cast-receiver](../README.md) / YouTubeCastReceiverOptions

# Interface: YouTubeCastReceiverOptions

Defined in: [src/lib/YouTubeCastReceiver.ts:19](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L19)

Options consumed by constructor of `YouTubeCastReceiver` class.

## Properties

### app?

> `optional` **app**: `Omit`\<[`AppOptions`](AppOptions.md), `"brand"` \| `"model"` \| `"logger"` \| `"screenName"` \| `"dataStore"`\>

Defined in: [src/lib/YouTubeCastReceiver.ts:24](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L24)

YouTube app options.

***

### dataStore?

> `optional` **dataStore**: `false` \| [`DataStore`](../classes/DataStore.md)

Defined in: [src/lib/YouTubeCastReceiver.ts:47](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L47)

The `DataStore` instance used for persisting data such as session info.

#### Default

`DefaultDataStore` instance

***

### device?

> `optional` **device**: `object`

Defined in: [src/lib/YouTubeCastReceiver.ts:26](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L26)

#### brand?

> `optional` **brand**: `string`

#### model?

> `optional` **model**: `string`

#### name?

> `optional` **name**: `string`

The name shown in a sender app's Cast menu, when the receiver device is discovered through DIAL.

##### Default

```ts
Hostname
```

#### screenName?

> `optional` **screenName**: `string`

The name shown in a sender app's Cast menu, when the receiver device was previously connected to through manual pairing.

##### Default

```ts
'YouTube on <device.name>''
```

***

### dial?

> `optional` **dial**: `Omit`\<[`DialOptions`](DialOptions.md), `"friendlyName"` \| `"manufacturer"` \| `"modelName"` \| `"logger"`\>

Defined in: [src/lib/YouTubeCastReceiver.ts:21](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L21)

DIAL server options.

***

### logger?

> `optional` **logger**: [`Logger`](Logger.md)

Defined in: [src/lib/YouTubeCastReceiver.ts:50](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L50)

***

### logLevel?

> `optional` **logLevel**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [src/lib/YouTubeCastReceiver.ts:49](https://github.com/patrickkfkan/yt-cast-receiver/blob/aaae6be7791dc18395321e3f4cadc8b560719cbf/src/lib/YouTubeCastReceiver.ts#L49)
