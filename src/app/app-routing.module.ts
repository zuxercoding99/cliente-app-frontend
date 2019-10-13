import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteDetallesComponent } from './cliente/cliente-detalles/cliente-detalles.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { LoginGuard } from './usuarios/guards/login.guard';
import { DetalleFacturaComponent } from './facturas/detalle-factura/detalle-factura.component';
import { FacturaFormComponent } from './facturas/factura-form/factura-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteComponent },
  { path: 'clientes/page/:page', component: ClienteComponent },
  {
    path: 'clientes/create',
    component: ClienteFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'clientes/edit/:id',
    component: ClienteFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'factura/:id',
    component: DetalleFacturaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] },
  },
  {
    path: 'cliente/:id/create-factura',
    component: FacturaFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'clientes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
