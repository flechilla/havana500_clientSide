export class IndexesCircularLinkedList {
  protected _length: number;
  protected _current: number;

  constructor(length: number) {
    this._current = 0;
    this._length = length;
  }

  public get successor(): number {
    if (this._length === 0) {
      throw new Error('Length equal 0');
    } else {
      return this._current < this._length - 1 ? this._current + 1 : 0;
    }
  }

  public get predecessor(): number {
    if (this._length === 0) {
      throw new Error('Length equal 0');
    } else {
      return this._current > 0 ? this._current - 1 : this._length - 1;
    }
  }

  public moveNext(): void {
    if (this._current === this._length - 1) {
      this._current = 0;
    } else {
      this._current++;
    }
  }

  public moveBack(): void {
    if (this._current === 0) {
      this._current = this._length - 1;
    } else {
      this._current--;
    }
  }

  public get current(): number {
    return this._current;
  }
}
