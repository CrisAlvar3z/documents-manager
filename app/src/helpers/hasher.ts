import { sha512 as SHA512 } from 'js-sha512';

export class Hasher {
  public static hash = {
    asSHA512: (
      objectToHash: string | number[] | ArrayBuffer | Uint8Array,
    ): string => SHA512.create().update(objectToHash).hex(),
  };
}