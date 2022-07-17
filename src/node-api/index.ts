import { NativeModules } from 'react-native';
import { Buffer as NodeBuffer } from 'buffer';

type BinaryLike = string | NodeJS.ArrayBufferView;

export function binaryLikeToBase64(binaryLike: BinaryLike): string {
  if (typeof binaryLike === 'string') return binaryLike;

  const newBuffer = NodeBuffer.alloc(binaryLike.byteLength);
  const view = new Uint8Array(binaryLike.buffer);
  for (let i = 0; i < newBuffer.length; ++i) {
    newBuffer[i] = view[i];
  }
  return newBuffer.toString('base64');
}

// Node API from @types/node
// function pbkdf2(password: BinaryLike, salt: BinaryLike, iterations: number, keylen: number, digest: string, callback: (err: Error | null, derivedKey: Buffer) => void): void;
export function pbkdf2(
  password: BinaryLike,
  salt: BinaryLike,
  iterations: number,
  keylen: number,
  digest:
    | 'sha1'
    | 'sha256'
    | 'sha512'
    | 'sha224'
    | 'sha384'
    | 'ripemd160' = 'sha1',
  callback: (err: Error | null, derivedKey: NodeBuffer) => void
): void {
  NativeModules.Pbkdf2.derive(
    binaryLikeToBase64(password),
    salt,
    iterations,
    keylen,
    digest
  )
    .then((base64Result: string) => {
      console.log('base64Result', base64Result);
      callback(null, NodeBuffer.from(base64Result));
    })
    .catch((error: unknown) => {
      if (error instanceof Error || error === null) {
        callback(error, NodeBuffer.alloc(0));
      }
    });
}
