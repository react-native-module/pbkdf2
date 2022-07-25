import { Buffer as NodeBuffer } from 'buffer';
import { NativeModules, Platform } from 'react-native';
import { Environment } from '@react-native-module/utility';
import { fromByteArray } from 'base64-js';

let doWarn = false;
type BinaryLike = string | NodeJS.ArrayBufferView;
type SupportDigest =
  | 'sha1'
  | 'sha256'
  | 'sha512'
  | 'sha224'
  | 'sha384'
  | 'ripemd160';

export function binaryLikeToBase64(binaryLike: BinaryLike): string {
  if (typeof binaryLike === 'string')
    return NodeBuffer.from(binaryLike, 'utf-8').toString('base64');
  const arrayBuffer = binaryLike.buffer.slice(
    binaryLike.byteOffset,
    binaryLike.byteOffset + binaryLike.byteLength
  );
  const base64 = fromByteArray(new Uint8Array(arrayBuffer));
  return base64;
}

function warnUnsupport() {
  if (Platform.OS === 'ios' && doWarn === false) {
    doWarn = true;
    console.warn('@react-native-module/pbkdf2 not support on IOS yet');
  }
}

function isSupport(): boolean {
  return Environment === 'NativeMobile' && Platform.OS === 'android';
}

function canUseNativeModule(functionName: string): boolean {
  try {
    return Boolean(NativeModules.Pbkdf2[functionName]);
  } catch (error) {
    return false;
  }
}

// Node API from @types/node
// function pbkdf2(password: BinaryLike, salt: BinaryLike, iterations: number, keylen: number, digest: string, callback: (err: Error | null, derivedKey: Buffer) => void): void;
export function pbkdf2(
  password: BinaryLike,
  salt: BinaryLike,
  iterations: number,
  keylen: number,
  digest: SupportDigest = 'sha1',
  callback: (err: Error | null, derivedKey: NodeBuffer) => void
): void {
  if (isSupport() && canUseNativeModule('derive')) {
    NativeModules.Pbkdf2.derive(
      binaryLikeToBase64(password),
      binaryLikeToBase64(salt),
      iterations,
      keylen,
      digest
    )
      .then((base64Result: string) => {
        callback(null, NodeBuffer.from(base64Result, 'base64'));
      })
      .catch((error: unknown) => {
        if (error instanceof Error || error === null) {
          callback(error, NodeBuffer.alloc(0));
        }
      });
  } else {
    warnUnsupport();
    try {
      const { pbkdf2: browserifyPbkdf2 } = require('pbkdf2/browser');
      browserifyPbkdf2(password, salt, iterations, keylen, digest, callback);
    } catch (error) {
      if (error instanceof Error || error === null) {
        callback(error, NodeBuffer.alloc(0));
      }
    }
  }
}
// function pbkdf2Sync(password: BinaryLike, salt: BinaryLike, iterations: number, keylen: number, digest: string): Buffer;
export function pbkdf2Sync(
  password: BinaryLike,
  salt: BinaryLike,
  iterations: number,
  keylen: number,
  digest: string
): NodeBuffer {
  if (isSupport() && canUseNativeModule('deriveSync')) {
    const base64Result = NativeModules.Pbkdf2.deriveSync(
      binaryLikeToBase64(password),
      binaryLikeToBase64(salt),
      iterations,
      keylen,
      digest
    );
    return NodeBuffer.from(base64Result, 'base64');
  } else {
    warnUnsupport();
    const { pbkdf2Sync: browserifyPbkdf2Sync } = require('pbkdf2/browser');
    return browserifyPbkdf2Sync(password, salt, iterations, keylen, digest);
  }
}
