import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

import { ModalService } from './modal.service';

@Component({
  selector: 'app-cliente-detalles',
  templateUrl: './cliente-detalles.component.html',
})
export class ClienteDetallesComponent implements OnInit {
  @Input() cliente: Cliente;
  private foto: File;
  progreso = 0;

  constructor(
    private clienteService: ClienteService,
    public modalService: ModalService
  ) {}

  ngOnInit() {}

  seleccionarFoto(event): void {
    this.progreso = 0;
    this.foto = event.target.files[0];
    if (!this.foto) {
      swal.fire('Error', 'Debe seleccionar una imagen', 'error');
    }
    if (this.foto.type.indexOf('image') < 0) {
      swal.fire('Error', 'Debe seleccionar una imagen', 'error');
      this.foto = null;
    }
  }

  subirFoto(): void {
    if (!this.foto) {
      swal.fire('Error', 'Debe seleccionar una imagen', 'error');
    } else {
      this.clienteService.subirFoto(this.foto, this.cliente.id).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.cliente = event.body as Cliente;
            swal.fire(
              'Foto Subida',
              'La imagen se subio correctamente',
              'success'
            );
            this.modalService.imageUpload.emit(this.cliente);
          }
        },
        error => {
          console.log(error);
          swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }
      );
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.foto = null;
    this.progreso = 0;
  }
}
