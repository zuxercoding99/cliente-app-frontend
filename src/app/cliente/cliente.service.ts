import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlCliente: string = 'http://localhost:8080/api/v1/clientes';

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlCliente + '/page/' + page).pipe(
      map((response: any) => {
        let clientes = response.content as Cliente[];
        clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          let datePipe: DatePipe = new DatePipe('es');
          //cliente.createdAt = datePipe.transform(cliente.createdAt, 'EEEE dd, MMMM yyyy');
          return cliente;
        });
        console.log(response);
        return response;
      })
    );
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlCliente}/${id}`).pipe(
      catchError(error => {
        this.router.navigate(['/clientes']);
        swal.fire('Error!', `${error.error.message}`, 'error');
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
        console.log(error);
        swal.fire('Error!', `${error.error.message}`, 'error');
        return throwError(error);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(`${this.urlCliente}/${cliente.id}`, cliente)
      .pipe(
        catchError(error => {
          if (error.status === 400) {
            return throwError(error);
          }
          console.log(error);
          swal.fire('Error!', `${error.error.message}`, 'error');
          return throwError(error);
        })
      );
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.urlCliente}/${id}`).pipe(
      catchError(error => {
        swal.fire('Error!', `${error.error.message}`, 'error');
        return throwError(error);
      })
    );
  }

  subirFoto(file: File, clientId): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('clientId', clientId);
    const req = new HttpRequest('POST', `${this.urlCliente}/upload`, formData, {
      reportProgress: true,
    });
    return this.http.request(req);
  }
}
