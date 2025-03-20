import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Clientes } from '../../Interfaces/clientes';
import { ClienteServiceService } from '../../Service/cliente-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-dialogo-create',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './dialogo-create.component.html',
  styleUrls: ['./dialogo-create.component.css'], 
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class DialogoCreateComponent {
  formCliente: FormGroup;
  accion = "Guardar";
  titulo = "Nuevo ";
  clientesLista: Clientes[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogoCreateComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _clienteService: ClienteServiceService,
    @Inject(MAT_DIALOG_DATA)  public cliente_dato: Clientes
  ) {
    this.formCliente = this.fb.group({
      id: [null],
      nombre_cliente: ['', Validators.required],
      numero_documento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_registro: ['', Validators.required]
    });

    this._clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientesLista = data;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  RegistrarCliente() {
    const modelo: Clientes = {
      id: this.formCliente.value.id,  
      nombre_cliente: this.formCliente.value.nombre_cliente,
      numero_documento: this.formCliente.value.numero_documento,
      telefono: this.formCliente.value.telefono,
      email: this.formCliente.value.email,
      fecha_registro: this.formCliente.value.fecha_registro
    };
    
  if(this.cliente_dato == null){
    this._clienteService.createCliente(modelo).subscribe({
      next: (data) => {
        this.mostrarAlerta("Cliente creado!", "Listo");
        this.dialogoReferencia.close("creado");
      },
      error: (e) => {
        this.mostrarAlerta("Error al crear", "Error");
      
      }
    });
  }else {
    if (this.cliente_dato?.id !== undefined) {
      this._clienteService.updateCliente(this.cliente_dato.id, modelo).subscribe({
        next: (data: any) => {
          this.mostrarAlerta("Cliente actualizado", "Correctamente");
          this.dialogoReferencia.close("actualizado");
        },
        error: (e: any) => {
          this.mostrarAlerta("Error al actualizar", "ERROR");
        }
      });
    }
  }

  
  }
  ngOnInit(){
    if (this.cliente_dato) {
      this.titulo = "Actualizar Cliente";
      this.accion = "Actualizar";
      this.formCliente.patchValue({
        id: this.cliente_dato.id, 
        nombre_cliente: this.cliente_dato.nombre_cliente,
        numero_documento: this.cliente_dato.numero_documento,
        telefono: this.cliente_dato.telefono,
        email: this.cliente_dato.email,
        fecha_registro: this.cliente_dato.fecha_registro
      });
    }
  }
  
}
