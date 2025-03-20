import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Alquileres } from '../../Interfaces/alquileres';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialogo-delete',
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
  templateUrl: './dialogo-delete.component.html',
  styleUrl: './dialogo-delete.component.css'
})

export class DialogoDeleteComponent {
  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
  
    @Inject(MAT_DIALOG_DATA) public dataAlquiler: Alquileres
  ){}


  Delete(){
    if (this.dataAlquiler){
      this.dialogoReferencia.close("eliminar")
    }
  }

}
