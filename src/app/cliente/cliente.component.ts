import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import swal from 'sweetalert2';
import { ModalService } from './cliente-detalles/modal.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'createAt'];
  paginador: any;
  clienteSeleccionado: Cliente;
  error = false;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.clienteService.getClientes(page).subscribe(
        (response: any) => {
          this.error = false;
          this.clientes = response.content;
          this.paginador = response;
        },
        error => {
          this.error = true;
        }
      );
    });

    this.modalService.imageUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if (clienteOriginal.id == cliente.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
  }

  deleteCliente(cliente: Cliente): void {
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
          this.clienteService.deleteCliente(cliente.id).subscribe(response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);

            swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
          });
        }
      });
  }

  abrirModal(cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
