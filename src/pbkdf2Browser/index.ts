// https://github.com/crypto-browserify/pbkdf2
// https://www.npmjs.com/package/pbkdf2

// why make pbkdf2Browser directory
// I have to resolve pbkdf2 -> @react-native-module/pbkdf2
// prevent Circular Dependencies
import { async as pbkdf2 } from './async';
import { sync as pbkdf2Sync } from './sync';

export { pbkdf2, pbkdf2Sync };
