import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent {
  newForm: FormGroup;
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.newForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      dni: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      editNombre: ['', Validators.required],
      editEmail: ['', Validators.required],
      editTelefono: ['', Validators.required],
      editDni: ['', Validators.required],
    });
  }
  data: any = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get('http://localhost:3000/api/clientes')
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
        email: this.newForm.value.email,
        telefono: this.newForm.value.telefono,
        dni: this.newForm.value.dni,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post('http://localhost:3000/api/cliente', body, {
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
        email: this.newForm.value.editEmail,
        telefono: this.newForm.value.editTelefono,
        dni: this.newForm.value.editDni,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .put(`http://localhost:3000/api/cliente/${editId.value}`, body, {
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
    const editEmail = <HTMLInputElement>document.getElementById('editEmail');
    editEmail.value = row.email;
    const editTelefono = <HTMLInputElement>(
      document.getElementById('editTelefono')
    );
    editTelefono.value = row.telefono;
    const editDni = <HTMLInputElement>document.getElementById('editDni');
    editDni.value = row.dni;
  }

  onDelete(id: number): void {
    console.log(id);
    this.http
      .delete(`http://localhost:3000/api/cliente/${id}`)
      .subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      });
  }
}
