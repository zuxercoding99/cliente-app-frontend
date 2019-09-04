import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlCliente: string = "http://localhost:8080/api/v1/clientes";
  
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlCliente);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlCliente}/${id}`).pipe(
      
      catchError(error => {
        this.router.navigate(["/clientes"]);
        swal.fire(
          'Error!',
          `${error.error.message}`,
          'error'
        )
        return throwError(error);
      })
    );
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlCliente, cliente).pipe(
      
      catchError(error => {

        if (error.status == 400) {
          return throwError(error);
        }

        swal.fire(
          'Error!',
          `${error.error.message}`,
          'error'
        )
        return throwError(error);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlCliente}/${cliente.id}`, cliente).pipe(
      
      catchError(error => {

        if (error.status == 400) {
          return throwError(error);
        }

        swal.fire(
          'Error!',
          `${error.error.message}`,
          'error'
        )
        return throwError(error);
      })
    );
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.urlCliente}/${id}`).pipe(
      
      catchError(error => {
        swal.fire(
          'Error!',
          `${error.error.message}`,
          'error'
        )
        return throwError(error);
      })
    );
  }
}
