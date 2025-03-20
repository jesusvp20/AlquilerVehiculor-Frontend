import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Clientes } from '../../Interfaces/clientes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-dialogo-delete-cliente',
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
  templateUrl: './dialogo-delete-cliente.component.html',
  styleUrl: './dialogo-delete-cliente.component.css'
})
export class DialogoDeleteClienteComponent {
 constructor (
  private dialogoReferencia: MatDialogRef<DialogoDeleteClienteComponent>,
  @Inject (MAT_DIALOG_DATA) public cliente_dato : Clientes
 ){}
 Delete(){
  if (this.cliente_dato){
    this.dialogoReferencia.close("eliminar")
  }
}

}
