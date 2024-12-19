import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  newForm: FormGroup;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.newForm = this.fb.group({
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      precio: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      editNombre: ['', Validators.required],
      editIngredientes: ['', Validators.required],
      editPrecio: ['', Validators.required],
      editCategoria: ['', Validators.required],
      editImagen: ['', Validators.required],
    });
  }
  data: any = [];
  categorias: any = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get('http://localhost:3000/api/platos').subscribe((data: any) => {
      console.log(data);
      this.data = data;
    });
    this.http
      .get('http://localhost:3000/api/categorias')
      .subscribe((categorias: any) => {
        console.log(categorias);
        this.categorias = categorias;
      });
  }

  getCategoriaName(id: any) {
    console.log(id);
    const categoria = this.categorias.filter(
      (obj: { _id: any }) => obj._id === id
    )[0];
    console.log(categoria);
    return categoria ? categoria.nombre : '';
  }

  openModal() {
    const modalDiv = document.getElementById('editModal');
    if (modalDiv) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modalDiv = document.getElementById('editModal');
    if (modalDiv) {
      modalDiv.style.display = 'none';
    }
  }

  agregar() {
    console.log('click');
    if (this.newForm.valid) {
      const body = JSON.stringify({
        nombre: this.newForm.value.nombre,
        ingredientes: this.newForm.value.ingredientes,
        precio: this.newForm.value.precio,
        categoria: this.newForm.value.categoria,
        imagen: this.newForm.value.imagen,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post('http://localhost:3000/api/plato', body, {
          headers,
        })
        .subscribe(
          (response) => {
            window.location.reload();
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  editar() {
    console.log('click');
    if (this.editForm) {
      const editId = <HTMLInputElement>document.getElementById('editId');
      const body = JSON.stringify({
        nombre: this.editForm.value.editNombre,
        descripcion: this.editForm.value.editDescripcion,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .put(`http://localhost:3000/api/plato/${editId.value}`, body, {
          headers,
        })
        .subscribe(
          (response) => {
            this.closeModal();
            window.location.reload();
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  onEdit(row: any): void {
    console.log(row);
    this.openModal();
    const editId = <HTMLInputElement>document.getElementById('editId');
    editId.value = row._id;
    const editNombre = <HTMLInputElement>document.getElementById('editNombre');
    editNombre.value = row.nombre;
    const editDescripcion = <HTMLInputElement>(
      document.getElementById('editDescripcion')
    );
    editDescripcion.value = row.descripcion;
  }

  onDelete(id: number): void {
    console.log(id);
    this.http
      .delete(`http://localhost:3000/api/plato/${id}`)
      .subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      });
  }
}
