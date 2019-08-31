import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlCliente: string = "http://localhost:8080/api/v1/clientes";
  
  constructor(private http: HttpClient) { }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlCliente);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlCliente}/${id}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlCliente, cliente);
  }

  updateCliente(cliente: Cliente, id: number): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlCliente}/${id}`, cliente);
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.urlCliente}/${id}`);
  }
}
