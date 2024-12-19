import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meseros',
  templateUrl: './meseros.component.html',
  styleUrls: ['./meseros.component.css'],
})
export class MeserosComponent implements OnInit {
  newForm: FormGroup;
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.newForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      dni: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      editNombre: ['', Validators.required],
      editApellido: ['', Validators.required],
      editUsuario: ['', Validators.required],
      editPassword: ['', Validators.required],
      editDni: ['', Validators.required],
    });
  }
  data: any = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get('http://localhost:3000/api/meseros')
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
        apellido: this.newForm.value.apellido,
        usuario: this.newForm.value.usuario,
        contrasena: this.newForm.value.password,
        dni: this.newForm.value.dni,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post('http://localhost:3000/api/mesero', body, {
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
        nombre: this.newForm.value.editNombre,
        apellido: this.newForm.value.editApellido,
        usuario: this.newForm.value.editUsuario,
        contrasena: this.newForm.value.editPassword,
        dni: this.newForm.value.editDni,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .put(`http://localhost:3000/api/mesero/${editId.value}`, body, {
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
    const editApellido = <HTMLInputElement>(
      document.getElementById('editApellido')
    );
    editApellido.value = row.apellido;
    const editUsuario = <HTMLInputElement>(
      document.getElementById('editUsuario')
    );
    editUsuario.value = row.usuario;
    const editDni = <HTMLInputElement>document.getElementById('editDni');
    editDni.value = row.dni;
  }

  onDelete(id: number): void {
    console.log(id);
    this.http
      .delete(`http://localhost:3000/api/mesero/${id}`)
      .subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      });
  }
}
