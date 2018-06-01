import { DataCompressorService } from './data-compressor.service';

describe('Service: DataCompressorService', () => {
  let DataCompressor;

  beforeEach(() => {
    DataCompressor = new DataCompressorService();
  });

  afterEach(() => {
    DataCompressor = null;
  });

  describe('#compress', () => {
    it('should retrieve empty uint when no data is passed', () => {
      const expectedCompressed = new Uint8Array(0);

      expect(DataCompressor.compress()).toEqual(expectedCompressed);
    });

    it('should retrieve uintarray when data is passed', () => {
      const expectedCompressed = Uint8Array.from([55, 130, 32, 118, 8, 96, 182, 10, 96, 206, 32, 23, 8, 32, 128, 208,
        128, 38, 16, 11, 188, 144, 54, 136, 2, 48, 129, 128, 76, 32, 11, 161, 128, 70, 2, 88, 4, 227, 128, 22, 74,
        138, 114, 17, 146, 37, 202, 210, 0, 47, 160, 160, 0, 0]);

      expect(DataCompressor.compress({names: 'as', dates: ['1', '2'], birth: { 1: 'a', 2: 'b'}})).toEqual(expectedCompressed);
    });
  });

  describe('#decompress', () => {
    it('should retrieve undefined when empty unit8array is passed', () => {

      expect(DataCompressor.decompress(new Uint8Array(0))).toBeNull();
    });

    it('should retrieve uintarray when data is passed', () => {
      const ompressedObject = Uint8Array.from([55, 130, 32, 118, 8, 96, 182, 10, 96, 206, 32, 23, 8, 32, 128, 208,
        128, 38, 16, 11, 188, 144, 54, 136, 2, 48, 129, 128, 76, 32, 11, 161, 128, 70, 2, 88, 4, 227, 128, 22, 74,
        138, 114, 17, 146, 37, 202, 210, 0, 47, 160, 160, 0, 0]);
      const expectedObject = {names: 'as', dates: ['1', '2'], birth: { 1: 'a', 2: 'b'}};

      expect(DataCompressor.decompress(ompressedObject)).toEqual(expectedObject);
    });
  });
});
