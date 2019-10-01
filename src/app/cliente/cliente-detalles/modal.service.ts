import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modal = false;
  private _imageUpload: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  abrirModal() {
    this._modal = true;
  }

  cerrarModal() {
    this._modal = false;
  }

  get modal(): boolean {
    return this._modal;
  }

  get imageUpload() {
    return this._imageUpload;
  }
}
