import { checkParameters } from './precondition';
import { defaultEncoding } from './default-encoding';
import { sync } from './sync';
import { toBuffer } from './to-buffer';

var toBrowser: { [key: string]: string } = {
  'sha': 'SHA-1',
  'sha-1': 'SHA-1',
  'sha1': 'SHA-1',
  'sha256': 'SHA-256',
  'sha-256': 'SHA-256',
  'sha384': 'SHA-384',
  'sha-384': 'SHA-384',
  'sha-512': 'SHA-512',
  'sha512': 'SHA-512',
};
interface callbackFunction {
  (error: any, result: Buffer): any;
}
interface newTickFunction {
  (callback: () => void): void;
}

var nextTick: newTickFunction;
function getNextTick() {
  if (nextTick) {
    return nextTick;
  }
  if (global.process && global.process.nextTick) {
    nextTick = global.process.nextTick;
  } else if (global.queueMicrotask) {
    nextTick = global.queueMicrotask;
  } else if (global.setImmediate) {
    nextTick = global.setImmediate;
  } else {
    nextTick = global.setTimeout;
  }
  return nextTick;
}

function resolvePromise(promise: Promise<Buffer>, callback: callbackFunction) {
  promise.then(
    function (out) {
      getNextTick()(function () {
        callback(null, out);
      });
    },
    function (e) {
      getNextTick()(function () {
        callback(e, Buffer.alloc(0));
      });
    }
  );
}

export function async(
  password: Buffer,
  salt: Buffer,
  iterations: number,
  keylen: number,
  digest: string | undefined,
  callback: (err: any, derivedKey: Buffer) => void
) {
  if (typeof digest === 'function') {
    callback = digest;
    digest = undefined;
  }

  digest = digest || 'sha1';
  var algo: any = toBrowser[digest.toLowerCase()];

  if (!algo || typeof global.Promise !== 'function') {
    getNextTick()(function () {
      var out;
      try {
        out = sync(password, salt, iterations, keylen, digest);
      } catch (e) {
        return callback(e, Buffer.alloc(0));
      }
      callback(null, out);
    });
    return;
  }

  checkParameters(iterations, keylen);
  password = toBuffer(password, defaultEncoding, 'Password');
  salt = toBuffer(salt, defaultEncoding, 'Salt');
  if (typeof callback !== 'function')
    throw new Error('No callback provided to pbkdf2');

  resolvePromise(
    Promise.resolve(sync(password, salt, iterations, keylen, digest)),
    callback
  );
}
