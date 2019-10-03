import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteDetallesComponent } from './cliente/cliente-detalles/cliente-detalles.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { LoginGuard } from './usuarios/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteComponent },
  { path: 'clientes/page/:page', component: ClienteComponent },
  {
    path: 'clientes/create',
    component: ClienteFormComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'clientes/edit/:id',
    component: ClienteFormComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'clientes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
