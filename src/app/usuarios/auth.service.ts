import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlEndpoint: string = 'http://localhost:8080/oauth/token';
  private clientId: string = 'angularapp';
  private secret: string = '12345';

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) {}

  login(usuario: Usuario): Observable<any> {
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    const credenciales = btoa(this.clientId + ':' + this.secret);

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    return this.http.post(this.urlEndpoint, params.toString(), {
      headers: headers,
    });
  }

  getPayload(accessToken: string) {
    if (accessToken != null) {
      let payload = JSON.parse(atob(accessToken.split('.')[1]));
      return payload;
    }

    return null;
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.getPayload(accessToken);
    let usuario: Usuario = new Usuario();
    usuario.username = payload.user_name;
    usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }

  guardarToken(accessToken: string): void {
    let token: string = accessToken;
    sessionStorage.setItem('token', token);
  }

  get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }

    return null;
  }

  get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (this.usuario != null && this.usuario.username && this.usuario.username.length > 0) {
      return true;
    }
    return false;
  }

  signOut(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }

  hasRole(role: string): boolean {
    return this.usuario && this.usuario.roles.includes(role);
  }
}
