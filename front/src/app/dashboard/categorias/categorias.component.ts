import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {
  data: any = [
    { nombre: 'Entradas', descripcion: 'Esto es entradas' },
    { nombre: 'Categoria 2', descripcion: 'Esto es una categoria' },
    { nombre: 'Categoria 3', descripcion: 'Esto es una categoria' },
  ];

  onEdit(id: number): void {
    console.log(id);
  }
  onDelete(id: number): void {
    console.log(id);
  }
}
