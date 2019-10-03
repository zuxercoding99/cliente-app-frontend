import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {}

  signOut() {
    this.auth.signOut();
    this.router.navigate(['login']);
    swal.fire('Sign Out', 'Deslogueado correctamente', 'success');
  }
}
