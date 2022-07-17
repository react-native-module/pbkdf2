# react-native-module-pbkdf2

PBKDF2 implementation for React Native

* 🔨 Android and iOS native support
* 🎨 Supports SHA-1, SHA-256, SHA-512

## Installation

```sh
npm install react-native-module-pbkdf2
```

## Usage

```js
import Pbkdf2 from "@react-native-module/pbkdf2";

const password = 'cGFzc3dvcmQ=';
const salt = 'c2FsdA==';
const numberIterations = 1000;
const keyLength = 16;
let res = await Pbkdf2.derive(password, salt, numberIterations, keyLength, 'sha-256');
// res is Base64 encoded key

```

## License

MIT
