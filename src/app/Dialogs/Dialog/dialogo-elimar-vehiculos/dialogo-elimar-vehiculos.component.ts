import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Vehiculos } from '../../../Interfaces/vehiculos';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-dialogo-elimar-vehiculos',
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
  templateUrl: './dialogo-elimar-vehiculos.component.html',
  styleUrl: './dialogo-elimar-vehiculos.component.css'
})
export class DialogoElimarVehiculosComponent {
  constructor(
    private dialogReferen: MatDialogRef<DialogoElimarVehiculosComponent>,
    @Inject(MAT_DIALOG_DATA) public dataVehiculo: Vehiculos
  ) {}

  Delete(){
    if(this.dataVehiculo){
      this.dialogReferen.close("eliminado")
    }
  }
}
