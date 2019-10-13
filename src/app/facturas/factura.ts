import { Cliente } from '../cliente/cliente';
import { ItemFactura } from './item-factura';

export class Factura {
  id: number;
  descripcion: string;
  observacion: string;
  createdAt: string;
  cliente: Cliente;
  items: ItemFactura[] = [];
  total: number;

  calcularTotal(): number {
    let total = 0;
    this.items.forEach(item => (total += item.calcularImporte()));
    return total;
  }
}
