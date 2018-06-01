import { Injectable } from '@angular/core';
import { DataArrayBufferService, DataContext } from './data-array-buffer.service';
import { DataCompressorService } from './data-compressor.service';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

interface DataModel {
  path: string;
  context: DataContext;
}

interface DataSubscriber {
  path: string;
  subscriber: Subscriber<any>;
}

@Injectable()
export class DataModelsService {
  private dataModels: Array<DataModel> = [];
  private dataSubscribers: Array<DataSubscriber> = [];

  constructor(private DataArrayBuffer: DataArrayBufferService, public DataCompressor: DataCompressorService) {}

  public getData(path: string): Observable<any> {
    return Observable.create((subscriber) => {
      const subscriberNumber = this.dataSubscribers.push({
        path,
        subscriber
      });
      const subscribedDataModel = this.getDataModelFromPath(path);

      if (subscribedDataModel) {
        subscriber.next(this.getDecompressedDataFromContext(subscribedDataModel.context));
      }

      return () => {
        this.dataSubscribers.slice(subscriberNumber - 1, 1);
      };
    });
  }

  public setData(path: string, newData: object) {
    const compressedData: Uint8Array = this.DataCompressor.compress(newData);
    const dataModel: DataModel = this.getDataModelFromPath(path) || this.createNewDataModel(path, compressedData.length);

    this.DataArrayBuffer.setBuffer(compressedData, dataModel.context);
    this.updateModels(dataModel.context, compressedData.length);
    this.notifySubscribersOfModel(dataModel);
  }

  private notifySubscribersOfModel(dataModel: DataModel) {
    this.dataSubscribers.forEach((dataSubscriber) => {
      if (dataSubscriber.path === dataModel.path) {
        dataSubscriber.subscriber.next(this.getDecompressedDataFromContext(dataModel.context));
      }
    });
  }

  private updateModels(oldContext: DataContext, newLength: number) {
    const lengthDifference = newLength - oldContext.length;
    this.dataModels.forEach((dataModel) => {
      if (dataModel.context.begin > oldContext.begin) {
        dataModel.context.begin += lengthDifference;
      }
      if (dataModel.context.begin === oldContext.begin) {
        dataModel.context.length = newLength;
      }
    });
  }

  private getDataModelFromPath(path: string) {
    return this.dataModels.find((dataModel: DataModel) => {
      return dataModel.path === path;
    });
  }

  private createNewDataModel(path: string, compressedDataLength: number): DataModel {
    const newModel = { path, context: { begin: this.DataArrayBuffer.getBufferLength(), length: compressedDataLength }};

    this.dataModels.push(newModel);

    return newModel;
  }

  private getDecompressedDataFromContext(context: DataContext) {
    const bufferData: Uint8Array = this.DataArrayBuffer.getBuffer(context);

    return this.DataCompressor.decompress(bufferData);
  }
}
