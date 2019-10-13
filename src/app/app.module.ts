import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CL';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteService } from './cliente/cliente.service';
import { PaginadorComponent } from './paginador/paginador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatDatepickerModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatMenuModule,
  MatAutocompleteModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ClienteDetallesComponent } from './cliente/cliente-detalles/cliente-detalles.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthInterceptor } from './usuarios/interceptors/auth';
import { TokenInterceptor } from './usuarios/interceptors/token';
import { DetalleFacturaComponent } from './facturas/detalle-factura/detalle-factura.component';
import { FacturaFormComponent } from './facturas/factura-form/factura-form.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClienteComponent,
    ClienteFormComponent,
    PaginadorComponent,
    ClienteDetallesComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturaFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [
    ClienteService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
