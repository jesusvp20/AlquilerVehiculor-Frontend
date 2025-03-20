import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input'; // Importar para entradas de texto
import { MatFormFieldModule } from '@angular/material/form-field';
import { VehiculosService } from './Service/vehiculos-service.service';
import { Vehiculos} from './Interfaces/vehiculos';
import { Clientes } from './Interfaces/clientes';
import { ClienteServiceService } from './Service/cliente-service.service';
import { TipoServiceService } from './Service/tipo-service.service';
import { Tipos } from './Interfaces/tipos';
import { AlquilerServiceService } from './Service/alquiler-service.service';
import { Alquileres } from './Interfaces/alquileres';
import { MatSelectModule } from '@angular/material/select'; import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,

    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule ,
    MatButtonModule,
    MatDialogModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Alquiler-VehiculosFrontend';

}
