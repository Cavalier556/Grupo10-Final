import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
})
export class OrdenesComponent {
  newForm: FormGroup;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.newForm = this.fb.group({
      mesa: ['', Validators.required],
      nroDeOrden: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      editMesa: ['', Validators.required],
      editNroDeOrden: ['', Validators.required],
    });
  }
  data: any = [];
  platos: any = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get('http://localhost:3000/api/ordenes')
      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
      });
    this.http
      .get('http://localhost:3000/api/platos')
      .subscribe((platos: any) => {
        console.log(platos);
        this.platos = platos;
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
        mesa: this.newForm.value.mesa,
        nroDeOrden: this.newForm.value.nroDeOrden,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post('http://localhost:3000/api/orden', body, {
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
        mesa: this.editForm.value.editMesa,
        numero: this.editForm.value.editNumero,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .put(`http://localhost:3000/api/orden/${editId.value}`, body, {
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
    const editMesa = <HTMLInputElement>document.getElementById('editMesa');
    editMesa.value = row.mesa;
    const editNumero = <HTMLInputElement>document.getElementById('editNumero');
    editNumero.value = row.numero;
  }

  onPagar(id: number): void {
    const body = JSON.stringify({
      estado: 'Pagado',
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .put(`http://localhost:3000/api/orden/${id}`, body, {
        headers,
      })
      .subscribe(
        (response) => {
          console.log('success');
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onDelete(id: number): void {
    console.log(id);
    this.http
      .delete(`http://localhost:3000/api/orden/${id}`)
      .subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      });
  }
}
