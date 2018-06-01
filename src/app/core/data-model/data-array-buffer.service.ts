import { Injectable } from '@angular/core';

export interface DataContext {
  begin: number;
  length: number;
}

@Injectable()
export class DataArrayBufferService {
  private dataBuffer: Uint8Array;

  public setBuffer(data: Uint8Array, context: DataContext) {
    if (this.dataBuffer) {
      this.updateDataBuffer(data, context);
    } else {
      this.createNewDataBuffer(data);
    }
  }

  public getBuffer(context: DataContext): Uint8Array {
    return this.dataBuffer ?
      this.dataBuffer.slice(context.begin, context.begin + context.length) :
      new Uint8Array(0);
  }

  public getBufferLength(): number {
    return ( this.dataBuffer && this.dataBuffer.length ) || 0;
  }

  private updateDataBuffer(data: Uint8Array, oldContext: DataContext) {
    const lengthDifference = data.length - oldContext.length;
    const newBufferSize = this.dataBuffer.length + lengthDifference;
    const newDataBuffer = new Uint8Array(newBufferSize);

    newDataBuffer.set(this.dataBuffer.slice(0, oldContext.begin));
    newDataBuffer.set(data, oldContext.begin);
    newDataBuffer.set(this.dataBuffer.slice(oldContext.begin + oldContext.length, this.dataBuffer.length), oldContext.begin + data.length);

    this.dataBuffer = newDataBuffer;
  }

  private createNewDataBuffer(data) {
    this.dataBuffer = data;
  }
}
