import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Vehiculos } from '../../Interfaces/vehiculos';
import { VehiculosService } from '../../Service/vehiculos-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TipoServiceService } from '../../Service/tipo-service.service';
import { Tipos } from '../../Interfaces/tipos';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialogo-create-vehiculos',
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
    FormsModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './dialogo-create-vehiculos.component.html',
  styleUrls: ['./dialogo-create-vehiculos.component.css']
})
export class DialogoCreateVehiculosComponent {
  formVehiculo: FormGroup;
  accion = "Registrar Vehículo";
  titulo = "Añadir Nuevo Vehículo";
  listaTipos: Tipos[] = [];
  listaVehiculos: Vehiculos[] = [];
  selectedFileName: string = '';

  constructor(
    private dialogoReferencia: MatDialogRef<DialogoCreateVehiculosComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _vehiculoS: VehiculosService,
    private _tipoS: TipoServiceService,
    @Inject(MAT_DIALOG_DATA) public vehiculo_dato: Vehiculos
  ) {
    this.formVehiculo = this.fb.group({
      placa: ["", Validators.required],
      modelo_vehiculo: ["", Validators.required],
      numero_vehiculo: ["", Validators.required],
      id_tipo: ["", Validators.required],
      precio_alquiler: ["", Validators.required],
      imagen_vehiculo: ["", Validators.required],
      estado: ["", Validators.required]
    });

    this._tipoS.getTipo().subscribe({
      next: (data) => {
        this.listaTipos = data;
      },
      error: (error) => {
        console.error("Error al cargar los tipos:", error);
      }
    });
  }

  MostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  RegistrarVehiculo() {
    const modelo: Vehiculos = {
      placa: this.formVehiculo.value.placa,
      numero_vehiculo: this.formVehiculo.value.numero_vehiculo,
      id_tipo: this.formVehiculo.value.id_tipo,
      modelo_vehiculo: this.formVehiculo.value.modelo_vehiculo,
      precio_alquiler: this.formVehiculo.value.precio_alquiler,
      estado: this.formVehiculo.value.estado,
      imagen_vehiculo: this.formVehiculo.value.imagen_vehiculo
    };
    if(this.vehiculo_dato == null){
      this._vehiculoS.createVehiculo(modelo).subscribe({
        next: () => {
          this.MostrarAlerta("Vehículo Registrado!", "Listo");
          this.dialogoReferencia.close("creado");
        },
        error: (error) => {
          console.error("Error al registrar el vehículo:", error);
        }
      });
    }else{
      this._vehiculoS.updateVehiculo(this.vehiculo_dato.placa,modelo).subscribe(
      {
        next:()=>{
          this.MostrarAlerta("Vehículo Actualizado!", "Listo");
          this.dialogoReferencia.close("actualizado");

        },
        error:(error)=>{
          console.error("Error al actualizar el vehículo:", error);
        }
      }
      )
    }   
    

   
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file: File = target.files[0];
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.formVehiculo.patchValue({ imagen_vehiculo: reader.result });
      };
      reader.readAsDataURL(file);
    }
    
  }

  formatCurrency(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    let numericValue = Number(value.replace(/[^0-9]/g, ''));
    input.value = numericValue.toLocaleString('en-US');
    this.formVehiculo.patchValue({ precio_alquiler: numericValue });
  }
  ngOnInit() {
      if(this.vehiculo_dato){
        this.titulo = "Actualizar Vehiculo";
        this.accion = "Actualizar";
        this.formVehiculo.patchValue({
          placa: this.vehiculo_dato.placa,
          numero_vehiculo: this.vehiculo_dato.numero_vehiculo,
          id_tipo: this.vehiculo_dato.id_tipo, 
          modelo_vehiculo: this.vehiculo_dato.modelo_vehiculo,
          precio_alquiler: this.vehiculo_dato.precio_alquiler,
          estado: this.vehiculo_dato.estado,
          imagen_vehiculo: this.vehiculo_dato.imagen_vehiculo
        })

      }
  }
}
