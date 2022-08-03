import checkParameters from './precondition';
import defaultEncoding from './default-encoding';
import sync from './sync';
import toBuffer from './to-buffer';
// var toBuffer = require('./to-buffer');

var toBrowser = {
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
var nextTick;
function getNextTick() {
  if (nextTick) {
    return nextTick;
  }
  // nextTick(callback: Function, ...args: any[]): void;
  if (global.process && global.process.nextTick) {
    nextTick = global.process.nextTick;
    // function queueMicrotask(callback: () => void): void
  } else if (global.queueMicrotask) {
    nextTick = global.queueMicrotask;
  } else if (global.setImmediate) {
    // declare function setImmediate(handler: () => void): number;
    // declare function setImmediate<Args extends any[]>(handler: (...args: Args) => void, ...args: Args): number;
    nextTick = global.setImmediate;
  } else {
    // declare function setTimeout(handler: () => void, timeout: number): number;
    // declare function setTimeout<Args extends any[]>(
    //     handler: (...args: Args) => void,
    //     timeout?: number,
    //     ...args: Args
    // ): number;
    nextTick = global.setTimeout;
  }
  return nextTick;
}

function resolvePromise(promise, callback) {
  promise.then(
    function (out) {
      getNextTick()(function () {
        callback(null, out);
      });
    },
    function (e) {
      getNextTick()(function () {
        callback(e);
      });
    }
  );
}

export default function (password, salt, iterations, keylen, digest, callback) {
  if (typeof digest === 'function') {
    callback = digest;
    digest = undefined;
  }

  digest = digest || 'sha1';
  var algo = toBrowser[digest.toLowerCase()];

  if (!algo || typeof global.Promise !== 'function') {
    getNextTick()(function () {
      var out;
      try {
        out = sync(password, salt, iterations, keylen, digest);
      } catch (e) {
        return callback(e);
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

  resolvePromise(sync(password, salt, iterations, keylen, digest), callback);
}
