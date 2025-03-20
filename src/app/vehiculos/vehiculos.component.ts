import { Component } from '@angular/core';
import { DialogoElimarVehiculosComponent } from '../Dialogs/Dialog/dialogo-elimar-vehiculos/dialogo-elimar-vehiculos.component';
import {  ViewChild } from '@angular/core';
import { Vehiculos } from '../Interfaces/vehiculos';
import { VehiculosService } from '../Service/vehiculos-service.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common'
import {MatSelectModule} from '@angular/material/select';
import { TipoServiceService } from '../Service/tipo-service.service';
import { Tipos } from '../Interfaces/tipos';
import { DialogoCreateVehiculosComponent } from '../Dialogs/dialogo-create-vehiculos/dialogo-create-vehiculos.component';

export interface vehiculos{
  numero_vehiculo: number;
  placa: string;
  modelo_vehiculo?:string;
  id_tipo: number;
  estado?: string;
}

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [MatIconModule,MatInputModule, 
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
   ],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})



export class VehiculosComponent  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(
  private _vehiculos: VehiculosService, 
  private route: Router, 
  public dialog: MatDialog, 
  private _snackbar : MatSnackBar,
   private _tipos :TipoServiceService) {}
displayedColumns: string[] = [ 'numero_vehiculo', 
  'imagen_vehiculo', 
  'placa', 
  'modelo_vehiculo',
  'tipo',
  'precio_alquiler', 
  'estado', 
  'acciones'
];
  dataSource = new MatTableDataSource <vehiculos>([]);
  tiposVehiculos: Tipos[] = [];
  go_to_home(url: string): void {
    this.route.navigate([url]);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cargarVehiculos();
    this.cargarDatos();

  }
  cargarVehiculos() {
    this._vehiculos.getVehiculo().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error cargando vehiculos:', error);
      }
    });
  }
  cargarDatos() {
    this._tipos.getTipo().subscribe({
      next: (data) => {
        console.log('Tipos recibidos:', data);
        this.tiposVehiculos = data;
      },
      error: (error) => {
        console.error('Error cargando tipos:', error);
      }
    });
}
getTipoName(id: number): string {
  const tipo = this.tiposVehiculos.find(t => t.id_tipo === id);
  return tipo ? tipo.nombre_tipo : id.toString();
}
 DialogoCreateVehiculosComponent() {
    this.dialog.open(DialogoCreateVehiculosComponent, {
      disableClose: true,
      width: "350px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.cargarVehiculos();  
      }
    });
  }
  editar(vehiculos:Vehiculos) {
    this.dialog.open(DialogoCreateVehiculosComponent, {
      disableClose: true,
      width: "350px",
      data: vehiculos
    }).afterClosed().subscribe(resultado => {
      if (resultado === "actualizado") {
        this.cargarVehiculos();  
      }
    });
  }

   eliminar(vehiculos: Vehiculos){
   this.dialog.open(DialogoElimarVehiculosComponent,{
    disableClose: true,
    width: "350px",
    data: vehiculos
   }).afterClosed().subscribe(resultado=>{
      if(resultado === "eliminado"){
         this._vehiculos.deleteVehiculo(vehiculos.placa).subscribe({
          next: (data)=>{
            this.MostrarAlerta("Vehiculo Eliminado", "Correctamente")
            this.cargarVehiculos();
          }
         })
      }

   })
   }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

   MostrarAlerta(msg: string, accion: string) {
    this._snackbar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

}
