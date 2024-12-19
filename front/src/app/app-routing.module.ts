import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SecretoComponent } from './secreto/secreto.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriasComponent } from './dashboard/categorias/categorias.component';
import { OrdenesComponent } from './dashboard/ordenes/ordenes.component';
import { ProductosComponent } from './dashboard/productos/productos.component';
import { MeserosComponent } from './dashboard/meseros/meseros.component';
import { ClientesComponent } from './dashboard/clientes/clientes.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'crear-usuario', component: RegistrarComponent },
  { path: 'secreto', component: SecretoComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/ordenes', component: OrdenesComponent },
  { path: 'dashboard/productos', component: ProductosComponent },
  { path: 'dashboard/categorias', component: CategoriasComponent },
  { path: 'dashboard/meseros', component: MeserosComponent },
  { path: 'dashboard/clientes', component: ClientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
