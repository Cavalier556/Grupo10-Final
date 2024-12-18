import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SecretoComponent } from './secreto/secreto.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriasComponent } from './dashboard/categorias/categorias.component';
import { ProductosComponent } from './dashboard/productos/productos.component';
import { MeserosComponent } from './dashboard/meseros/meseros.component';
import { ClientesComponent } from './dashboard/clientes/clientes.component';
import { OrdenesComponent } from './dashboard/ordenes/ordenes.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SecretoComponent, RegistrarComponent, DashboardComponent, CategoriasComponent, ProductosComponent, MeserosComponent, ClientesComponent, OrdenesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
