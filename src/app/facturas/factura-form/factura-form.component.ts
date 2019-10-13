import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, tap, flatMap } from 'rxjs/operators';
import { FacturaService } from '../services/factura.service';
import { Producto } from '../producto';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ItemFactura } from '../item-factura';
import { Factura } from '../factura';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/cliente/cliente';
import { ClienteService } from 'src/app/cliente/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css'],
})
export class FacturaFormComponent implements OnInit {
  factura: Factura = new Factura();
  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId: number = +params.get('id');
      if (clienteId) {
        this.clienteService.getClienteById(clienteId).subscribe((cliente: Cliente) => {
          this.factura.cliente = cliente;
        });
      }
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      map(value => (typeof value === 'string' ? value : value.nombre)),
      flatMap(value => (value ? this._filter(value) : []))
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    return this.facturaService.filtrarProductosByNombre(value);
  }
  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;

    if (this.existeProducto(producto.id)) {
      this.incrementarCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      nuevoItem.cantidad = 1;
      this.factura.items.push(nuevoItem);
    }
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event) {
    let cantidad = event.target.value as number;

    if (!cantidad || cantidad <= 0) {
      this.eliminarItem(id);
    }

    this.factura.items = this.factura.items.map(item => {
      if (item.producto.id === id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  incrementarCantidad(id: number) {
    this.factura.items = this.factura.items.map(item => {
      if (item.producto.id === id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  private existeProducto(id: number): boolean {
    let existe: boolean = false;
    this.factura.items.forEach(item => {
      if (item.producto.id == id) {
        existe = true;
      }
    });
    return existe;
  }

  eliminarItem(id: number): void {
    this.factura.items = this.factura.items.filter(item => item.producto.id !== id);
  }

  crearFactura(facturaForm): void {
    if (this.factura.items.length == 0) {
      this.autocompleteControl.setErrors({ invalid: true });
    }

    if (facturaForm.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura).subscribe(factura => {
        Swal.fire(
          'Nueva Factura',
          `Factura '${factura.descripcion}' fue creada con exito!`,
          'success'
        );
        this.router.navigate(['/factura', factura.id]);
      });
    }
  }
}
