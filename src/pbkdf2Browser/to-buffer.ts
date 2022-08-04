import { Buffer } from 'buffer';

export function toBuffer(
  thing: Buffer | string | ArrayBuffer,
  encoding: BufferEncoding | undefined,
  name: string
) {
  if (Buffer.isBuffer(thing)) {
    return thing;
  } else if (typeof thing === 'string') {
    return Buffer.from(thing, encoding);
  } else if (ArrayBuffer.isView(thing)) {
    return Buffer.from(thing.buffer);
  } else {
    throw new TypeError(
      name + ' must be a string, a Buffer, a typed array or a DataView'
    );
  }
}
