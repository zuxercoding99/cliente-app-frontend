import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();

  constructor(private authService: AuthService, private router: Router) {
    console.log('ola');
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/clientes']);
      console.log('xd');
    }
  }

  login(): void {
    if (this.usuario.username == null && this.usuario.password == null) {
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        let payload = this.authService.getPayload(response.access_token);
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        this.router.navigate(['/clientes']);
        swal.fire('Login Exitoso', 'Bienvenido ' + this.authService.usuario.username, 'success');
      },
      error => {
        swal.fire('Error', 'Username or Password wrong', 'error');
      }
    );
  }
}
