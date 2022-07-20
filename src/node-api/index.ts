import { Buffer as NodeBuffer } from 'buffer';
import { Environment } from '@react-native-module/utility';
import { fromByteArray } from 'base64-js';

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
  if (Environment === 'NativeMobile') {
    const { NativeModules } = require('react-native');
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
    const browserify = require('pbkdf2');
    const { pbkdf2: browserifyPbkdf2 } = browserify;
    browserifyPbkdf2(password, salt, iterations, keylen, digest, callback);
  }
}
