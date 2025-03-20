import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Alquileres } from '../../Interfaces/alquileres';
import { Clientes } from '../../Interfaces/clientes';
import { Vehiculos } from '../../Interfaces/vehiculos';
import { VehiculosService } from '../../Service/vehiculos-service.service';
import { ClienteServiceService } from '../../Service/cliente-service.service';
import { AlquilerServiceService } from '../../Service/alquiler-service.service';
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
  selector: 'app-dialog-add-edit',
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
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class DialogAddEditComponent {
  
  formAlquiler: FormGroup;
  titulo: string = 'Nuevo';
  accion: string = 'Guardar';
  listaAlquiler: Alquileres[] = [];
  clientesLista: Clientes[] = [];
  vehiculosLista: Vehiculos[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _vehiculosService: VehiculosService,
    private _clienteService: ClienteServiceService,
    private _alquilerSerice: AlquilerServiceService,
    @Inject(MAT_DIALOG_DATA) public dataAlquiler: Alquileres
  ) {
    this.formAlquiler = this.fb.group({
      detalles_alquiler: ['', Validators.required],
      precio_alquiler: ['', Validators.required],
      fecha_alquiler: ['', Validators.required],
      fecha_devolucion: ['', Validators.required],
      id_cliente: ['', Validators.required],
      placa_vehiculo: ['', Validators.required]
    }, { validators: this.dateValidator('fecha_alquiler', 'fecha_devolucion') });

    this._alquilerSerice.getAlquileres().subscribe({
      next: (data) => {
        this.listaAlquiler = data;
      },
      error: (e) => {
        console.error(e);
      }
    });

    this._clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientesLista = data;
      },
      error: (e) => {
        console.error(e);
      }
    });

    this._vehiculosService.getVehiculo().subscribe({
      next: (data) => {
        this.vehiculosLista = data;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
  
  dateValidator(fechaAlquilerKey: string, fechaDevolucionKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      const fechaAlquiler = group.get(fechaAlquilerKey)?.value;
      const fechaDevolucion = group.get(fechaDevolucionKey)?.value;
      if (fechaAlquiler && fechaDevolucion) {
        const inicio = new Date(fechaAlquiler);
        const fin = new Date(fechaDevolucion);
        if (fin < inicio) {
          return { dateInvalid: true };
        }
      }
      return null;
    };
  }
  
  MostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  addAlquiler() {
    const modelo: Alquileres = {
      id: this.formAlquiler.value.id,
      detalles_alquiler: this.formAlquiler.value.detalles_alquiler,
      precio_alquiler: this.formAlquiler.value.precio_alquiler,
      fecha_alquiler: this.formAlquiler.value.fecha_alquiler,
      fecha_devolucion: this.formAlquiler.value.fecha_devolucion,
      placa_vehiculo: this.formAlquiler.value.placa_vehiculo,
      id_cliente: this.formAlquiler.value.id_cliente
    };

    if (this.dataAlquiler == null) {
      this._alquilerSerice.createAlquiler(modelo).subscribe({
        next: (data) => {
          this.MostrarAlerta("Alquiler creado correctamente", "Listo");
          this.dialogoReferencia.close("creado");
        },
        error: (e) => {
          this.MostrarAlerta("No se pudo crear", "Error");
        }
      });
    } else {
      if (this.dataAlquiler.id !== undefined) {
        this._alquilerSerice.updateAlquiler(this.dataAlquiler.id, modelo).subscribe({
          next: (data) => {
            
            this.MostrarAlerta("Alquiler actualizado correctamente", "Listo");
            this.dialogoReferencia.close("actualizado");
          },
          error: (e) => {
            this.MostrarAlerta("No se pudo actualizar", "Error");
          }
        });
      } else {
        this.MostrarAlerta("No se pudo actualizar: ID no definido", "Error");
      }
    }
  }

  ngOnInit(): void {
    if (this.dataAlquiler) {
      this.titulo = 'Editar';
      this.accion = 'Actualizar';
      this.formAlquiler.patchValue({
        id: this.dataAlquiler.id,
        detalles_alquiler: this.dataAlquiler.detalles_alquiler,
        precio_alquiler: this.dataAlquiler.precio_alquiler,
        fecha_alquiler: this.dataAlquiler.fecha_alquiler,
        fecha_devolucion: this.dataAlquiler.fecha_devolucion,
        id_cliente: this.dataAlquiler.id_cliente,
        placa_vehiculo: this.dataAlquiler.placa_vehiculo
      });
    }
  }
}
