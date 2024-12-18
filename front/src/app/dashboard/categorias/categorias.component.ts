import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  newForm: FormGroup;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.newForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      editNombre: ['', Validators.required],
      editDescripcion: ['', Validators.required],
    });
  }
  data: any = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get('http://localhost:3000/api/categorias')
      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
      });
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
        descripcion: this.newForm.value.descripcion,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post('http://localhost:3000/api/categoria', body, {
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
        .put(`http://localhost:3000/api/categoria/${editId.value}`, body, {
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
      .delete(`http://localhost:3000/api/categoria/${id}`)
      .subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      });
  }
}
