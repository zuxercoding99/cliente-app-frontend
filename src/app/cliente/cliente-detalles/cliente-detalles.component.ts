import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

import { ModalService } from './modal.service';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Factura } from 'src/app/facturas/factura';
import { FacturaService } from 'src/app/facturas/services/factura.service';

@Component({
  selector: 'app-cliente-detalles',
  templateUrl: './cliente-detalles.component.html',
})
export class ClienteDetallesComponent implements OnInit {
  @Input() cliente: Cliente;
  foto: File;
  progreso = 0;

  constructor(
    private clienteService: ClienteService,
    private facturaService: FacturaService,
    public modalService: ModalService,
    public auth: AuthService
  ) {}

  ngOnInit() {}

  seleccionarFoto(event): void {
    this.progreso = 0;
    console.log(event.target.files[0]);
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
            swal.fire('Foto Subida', 'La imagen se subio correctamente', 'success');
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

  delete(factura: Factura) {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estas seguro?',
        // tslint:disable-next-line: quotemark
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.value) {
          this.facturaService.deleteById(factura.id).subscribe(() => {
            this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura);

            swalWithBootstrapButtons.fire('Eliminado!', 'Your file has been deleted.', 'success');
          });
        }
      });
  }
}
