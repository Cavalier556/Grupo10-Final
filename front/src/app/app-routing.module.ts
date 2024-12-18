import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SecretoComponent } from './secreto/secreto.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriasComponent } from './dashboard/categorias/categorias.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'crear-usuario', component: RegistrarComponent },
  { path: 'secreto', component: SecretoComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/categorias', component: CategoriasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
