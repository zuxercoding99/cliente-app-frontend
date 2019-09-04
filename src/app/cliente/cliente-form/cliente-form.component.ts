import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  title: string = "Crear Cliente";
  errors: string[];

  constructor(private clienteService: ClienteService, private router: Router,
    private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  createCliente(): void {
    this.clienteService.createCliente(this.cliente).subscribe(
      cliente => {
        this.router.navigate(["/clientes"]);
        swal.fire(
          'Cliente Creado!',
          `El cliente ${cliente.nombre} ha sido creado con exito.`,
          'success'
        )
      },
      error => this.errors = error.error.errors as string[]  
    );
  }

  cargarCliente() : void {
    this.activedRoute.params.subscribe(param => {
      let id = param["id"];
      if(id) {
        this.clienteService.getClienteById(id).subscribe(
          cliente => this.cliente = cliente
        );
      }
    });
  }

  updateCliente(): void {
    this.clienteService.updateCliente(this.cliente).subscribe(
      cliente => {
        this.router.navigate(["/clientes"]);
        swal.fire(
          'Cliente Actualizado!',
          `El cliente ${cliente.nombre} ha sido actualizado con exito.`,
          'success'
        )
      },
      error => this.errors = error.error.errors as string[]
    );
  }

}
