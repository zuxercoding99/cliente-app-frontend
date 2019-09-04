import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';


const routes: Routes = [
  {path: "", redirectTo: "/clientes", pathMatch: "full"},
  {path: "clientes", component: ClienteComponent},
  {path: "clientes/create", component: ClienteFormComponent},
  {path: "clientes/edit/:id", component: ClienteFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
