# @react-native-module/pbkdf2

PBKDF2 implementation for React Native

- 🔨 Android and iOS native support
- 🎨 Supports SHA-1, SHA-256, SHA-512

## Installation

```
npm install ---save @react-native-module/pbkdf2
```

```
yarn add @react-native-module/pbkdf2
```

## Usage

```js
import { pbkdf2 } from '@react-native-module/pbkdf2';

const password = 'cGFzc3dvcmQ=';
const salt = 'c2FsdA==';
const iterations = 1000;
const keylen = 16;
const digest = 'sha256';
pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
  if (err) {
    console.warn(err.message);
  } else {
    console.log(derivedKey); // derivedKey is Buffer
  }
});
```

## License

MIT
