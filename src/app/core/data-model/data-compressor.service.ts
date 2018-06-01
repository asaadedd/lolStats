import { Injectable } from '@angular/core';
import { compressToUint8Array , decompressFromUint8Array } from 'lz-string/libs/lz-string.js';

@Injectable()
export class DataCompressorService {
  public compress(dataObject: object): Uint8Array {
    const objectStringify = JSON.stringify(dataObject);

    return compressToUint8Array(objectStringify);
  }

  public decompress(compressedObject: Uint8Array): object {
    const objectStringify = decompressFromUint8Array(compressedObject);

    return JSON.parse(objectStringify);
  }
}
