import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import {clientes} from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes() : Cliente[] {
    return clientes;
  }
}
