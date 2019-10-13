import { Producto } from './producto';

export class ItemFactura {
  id: number;
  cantidad: number;
  producto: Producto;
  importe: number;

  calcularImporte(): number {
    return this.cantidad * this.producto.precio;
  }
}
