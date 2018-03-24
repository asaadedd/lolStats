export interface DataContext {
  begin: number;
  end: number;
}

export class DataObject {
  private dataBuffer;
  private bufferSize;

  public setData(data, context: DataContext) {
    if (this.dataBuffer) {
      this.updateDataBuffer(data, context);
    } else {
      this.createNewDataBuffer(data, context);
    }
  }

  public getData(context: DataContext) {
    Buffer.from('asd');
    return this.dataBuffer ?
      this.dataBuffer.slice(context.begin, context.end);

  }

  private updateDataBuffer(data, context: DataContext) {
    const newBufferSize = this.bufferSize + context.end;
    const newDataBuffer = new Uint8Array(newBufferSize);

    newDataBuffer.set(this.dataBuffer.slice(0, this.bufferSize));
    newDataBuffer.set(data, this.bufferSize);

    this.dataBuffer = newDataBuffer;
    this.bufferSize = newBufferSize;
  }

  private createNewDataBuffer(data, context: DataContext) {
    const newDataBuffer = new Uint8Array(context.end);

    newDataBuffer.set(newDataBuffer);

    this.dataBuffer = newDataBuffer;
  }

}
