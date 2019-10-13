import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../factura';
import { Observable } from 'rxjs';
import { Producto } from '../producto';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  url: string = 'http://localhost:8080/api/v1/facturas';
  constructor(private http: HttpClient) {}

  findById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.url}/${id}`);
  }

  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.url, factura);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  filtrarProductosByNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/filtrar-producto/${nombre}`);
  }
}
