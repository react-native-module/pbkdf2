import { Buffer } from 'buffer';
import { checkParameters } from './precondition';
import { defaultEncoding } from './default-encoding';
import { toBuffer } from './to-buffer';
import type { BinaryLike } from 'crypto';

var ZEROS = Buffer.alloc(128);
var sizes: { [key: string]: number } = {
  md5: 16,
  sha1: 20,
  sha224: 28,
  sha256: 32,
  sha384: 48,
  sha512: 64,
  rmd160: 20,
  ripemd160: 20,
};

class Hmac {
  ipad1;
  ipad2;
  opad;
  alg;
  blocksize;
  hash;
  size;

  constructor(alg: string, key: Buffer | Uint8Array, saltLen: number) {
    var hash = getDigest(alg);
    var blocksize = alg === 'sha512' || alg === 'sha384' ? 128 : 64;

    if (key.length > blocksize) {
      key = hash(key);
    } else if (key.length < blocksize) {
      key = Buffer.concat([key, ZEROS], blocksize);
    }

    var ipad = Buffer.allocUnsafe(blocksize + sizes[alg]);
    var opad = Buffer.allocUnsafe(blocksize + sizes[alg]);
    for (var i = 0; i < blocksize; i++) {
      ipad[i] = key[i] ^ 0x36;
      opad[i] = key[i] ^ 0x5c;
    }

    var ipad1 = Buffer.allocUnsafe(blocksize + saltLen + 4);
    ipad.copy(ipad1, 0, 0, blocksize);
    this.ipad1 = ipad1;
    this.ipad2 = ipad;
    this.opad = opad;
    this.alg = alg;
    this.blocksize = blocksize;
    this.hash = hash;
    this.size = sizes[alg];
  }

  run(data: { copy: (arg0: any, arg1: any) => void }, ipad: any) {
    data.copy(ipad, this.blocksize);
    var h = this.hash(ipad);
    h.copy(this.opad, this.blocksize);
    return this.hash(this.opad);
  }
}

function getDigest(alg: string) {
  function shaFunc(data: BinaryLike) {
    const sha = require('sha.js');
    return sha(alg).update(data).digest();
  }
  function rmd160Func(data: BinaryLike) {
    const RIPEMD160 = require('ripemd160');
    return new RIPEMD160.default().update(data).digest();
  }

  if (alg === 'rmd160' || alg === 'ripemd160') return rmd160Func;
  if (alg === 'md5') {
    const md5 = require('create-hash/md5');
    return md5.default;
  }
  return shaFunc;
}

export function sync(
  password: Buffer,
  salt: Buffer,
  iterations: number,
  keylen: number,
  digest: string | undefined
): Buffer {
  checkParameters(iterations, keylen);
  password = toBuffer(password, defaultEncoding, 'Password');
  salt = toBuffer(salt, defaultEncoding, 'Salt');

  digest = digest || 'sha1';

  var hmac = new Hmac(digest, password, salt.length);

  var DK = Buffer.allocUnsafe(keylen);
  var block1 = Buffer.allocUnsafe(salt.length + 4);
  salt.copy(block1, 0, 0, salt.length);

  var destPos = 0;
  var hLen = sizes[digest];
  var l = Math.ceil(keylen / hLen);

  for (var i = 1; i <= l; i++) {
    block1.writeUInt32BE(i, salt.length);

    var T = hmac.run(block1, hmac.ipad1);
    var U = T;

    for (var j = 1; j < iterations; j++) {
      U = hmac.run(U, hmac.ipad2);
      for (var k = 0; k < hLen; k++) T[k] ^= U[k];
    }

    T.copy(DK, destPos);
    destPos += hLen;
  }

  return DK;
}
