import { DataArrayBufferService } from './data-array-buffer.service';

describe('Service: DataArrayBuffer', () => {
  let DataArrayBuffer;

  beforeEach(() => {
    DataArrayBuffer = new DataArrayBufferService();
  });

  afterEach(() => {
    DataArrayBuffer = null;
  });

  describe('#setBuffer', () => {
    it('should set new data buffer', () => {
      const newDataBuffer = Uint8Array.from([33, 130, 224, 222, 4, 98, 8, 192, 76, 12, 192, 95, 32, 0]);
      const context = {begin: 0, length: newDataBuffer.length};
      const firstPartOfBuffer = Uint8Array.from([33, 130, 224, 222, 4, 98, 8]);
      const firstContext = {begin: 0, length: 7};
      const secondPartOfBuffer = Uint8Array.from([192, 76, 12, 192, 95, 32, 0]);
      const secondContext = {begin: 7, length: newDataBuffer.length - 7};

      DataArrayBuffer.setBuffer(newDataBuffer, context);

      expect(DataArrayBuffer.getBuffer(context)).toEqual(newDataBuffer);
      expect(DataArrayBuffer.getBuffer(firstContext)).toEqual(firstPartOfBuffer);
      expect(DataArrayBuffer.getBuffer(secondContext)).toEqual(secondPartOfBuffer);
    });

    it('should update the data buffer with same length', () => {
      const currentBuffer = Uint8Array.from([33, 130, 224, 222, 4, 98, 8, 192, 76, 12, 192, 95, 32, 0]);
      const updatedBuffer = Uint8Array.from([5, 3, 2, 77]);
      const oldContext = { begin: 3, length: 4};
      const newBuffer = Uint8Array.from([33, 130, 224, 5, 3, 2, 77, 192, 76, 12, 192, 95, 32, 0]);
      const newContext = { begin: 0, length: newBuffer.length };

      DataArrayBuffer.setBuffer(currentBuffer, newContext);
      DataArrayBuffer.setBuffer(updatedBuffer, oldContext);

      expect(DataArrayBuffer.getBuffer(newContext)).toEqual(newBuffer);
    });

    it('should update the data buffer with bigger length', () => {
      const currentBuffer = Uint8Array.from([33, 130, 224, 222, 4, 98, 8, 192, 76, 12, 192, 95, 32, 0]);
      const updatedBuffer = Uint8Array.from([5, 3, 2, 77, 45, 65]);
      const oldContext = { begin: 3, length: 4};
      const newBuffer = Uint8Array.from([33, 130, 224, 5, 3, 2, 77, 45, 65, 192, 76, 12, 192, 95, 32, 0]);
      const newContext = { begin: 0, length: newBuffer.length };

      DataArrayBuffer.setBuffer(currentBuffer, newContext);
      DataArrayBuffer.setBuffer(updatedBuffer, oldContext);

      expect(DataArrayBuffer.getBuffer(newContext)).toEqual(newBuffer);
    });

    it('should update the data buffer with lesser length', () => {
      const currentBuffer = Uint8Array.from([33, 130, 224, 222, 4, 98, 8, 192, 76, 12, 192, 95, 32, 0]);
      const updatedBuffer = Uint8Array.from([5, 3]);
      const oldContext = { begin: 3, length: 4};
      const newBuffer = Uint8Array.from([33, 130, 224, 5, 3, 192, 76, 12, 192, 95, 32, 0]);
      const newContext = { begin: 0, length: newBuffer.length };

      DataArrayBuffer.setBuffer(currentBuffer, newContext);
      DataArrayBuffer.setBuffer(updatedBuffer, oldContext);

      expect(DataArrayBuffer.getBuffer(newContext)).toEqual(newBuffer);
    });
  });

  describe('#getBuffer', () => {
    it('should retrieve the buffer when nothig is setted', () => {
      const expectedBuffer = new Uint8Array(0);

      expect(DataArrayBuffer.getBufferLength()).toEqual(0);
      expect(DataArrayBuffer.getBuffer()).toEqual(expectedBuffer);
    });

    it('should retrieve the buffer when buffer is setted', () => {
      const buffer = Uint8Array.from([5, 3]);

      DataArrayBuffer.setBuffer(buffer, { begin: 0, length: 2 });

      expect(DataArrayBuffer.getBufferLength()).toEqual(2);
      expect(DataArrayBuffer.getBuffer({ begin: 0, length: 2 })).toEqual(buffer);
    });
  });
});
