import { DataModelsService } from './data-model.service';
import { DataCompressorService } from './data-compressor.service';
import { DataArrayBufferService } from './data-array-buffer.service';

describe('Service: DataModelsService', () => {
  let suite;

  beforeEach(() => {
    suite = {};
    suite.DataCompressor = new DataCompressorService();
    suite.DataArrayBuffer = new DataArrayBufferService();
    suite.DataModels = new DataModelsService(suite.DataArrayBuffer, suite.DataCompressor);
  });

  afterEach(() => {
    suite = null;
  });

  describe('#updateModels', () => {
    it('should update every data model when a model is shortened', () => {
      const newModels = [
        {path: 'Path1', context: { begin: 0, length: 5 }},
        {path: 'Path2', context: { begin: 5, length: 3 }},
        {path: 'Path3', context: { begin: 8, length: 4 }},
        {path: 'Path4', context: { begin: 12, length: 2 }},
        {path: 'Path5', context: { begin: 14, length: 5 }}
      ];

      suite.DataModels.dataModels = [
        {path: 'Path1', context: { begin: 0, length: 5 }},
        {path: 'Path2', context: { begin: 5, length: 3 }},
        {path: 'Path3', context: { begin: 8, length: 10 }},
        {path: 'Path4', context: { begin: 18, length: 2 }},
        {path: 'Path5', context: { begin: 20, length: 5 }}
      ];

      suite.DataModels.updateModels({ begin: 8, length: 10 }, 4);

      expect(suite.DataModels.dataModels).toEqual(newModels);
    });

    it('should update every data model when a model is lengthened', () => {
      const newModels = [
        {path: 'Path1', context: { begin: 0, length: 5 }},
        {path: 'Path2', context: { begin: 5, length: 10 }},
        {path: 'Path3', context: { begin: 15, length: 10 }},
        {path: 'Path4', context: { begin: 25, length: 2 }},
        {path: 'Path5', context: { begin: 27, length: 5 }}
      ];

      suite.DataModels.dataModels = [
        {path: 'Path1', context: { begin: 0, length: 5 }},
        {path: 'Path2', context: { begin: 5, length: 3 }},
        {path: 'Path3', context: { begin: 8, length: 10 }},
        {path: 'Path4', context: { begin: 18, length: 2 }},
        {path: 'Path5', context: { begin: 20, length: 5 }}
      ];

      suite.DataModels.updateModels({ begin: 5, length: 3 }, 10);

      expect(suite.DataModels.dataModels).toEqual(newModels);
    });
  });

  describe('#notifySubscribersOfModel', () => {
    it('should notify all subscribers of a path', () => {
      const expectedObject = { name: 'string', surname: 'surname' };
      suite.DataModels.dataSubscribers = [
        {path: 'Path1', subscriber: { next: () => {}}},
        {path: 'Path2', subscriber: { next: () => {}}},
        {path: 'Path2', subscriber: { next: () => {}}}
      ];
      spyOn(suite.DataModels.dataSubscribers[0].subscriber, 'next');
      spyOn(suite.DataModels.dataSubscribers[1].subscriber, 'next');
      spyOn(suite.DataModels.dataSubscribers[2].subscriber, 'next');
      spyOn(suite.DataArrayBuffer, 'getBuffer').and.returnValue(true);
      spyOn(suite.DataCompressor, 'decompress').and.returnValue(expectedObject);

      suite.DataModels.notifySubscribersOfModel({ path: 'Path2', context: {}});

      expect(suite.DataModels.dataSubscribers[1].subscriber.next).toHaveBeenCalledTimes(1);
      expect(suite.DataModels.dataSubscribers[1].subscriber.next).toHaveBeenCalledWith(expectedObject);
      expect(suite.DataModels.dataSubscribers[2].subscriber.next).toHaveBeenCalledTimes(1);
      expect(suite.DataModels.dataSubscribers[2].subscriber.next).toHaveBeenCalledWith(expectedObject);
      expect(suite.DataModels.dataSubscribers[0].subscriber.next).toHaveBeenCalledTimes(0);
    });
  });
});
