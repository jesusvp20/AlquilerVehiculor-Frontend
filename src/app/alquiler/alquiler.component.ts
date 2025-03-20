import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AlquilerServiceService } from '../Service/alquiler-service.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddEditComponent } from '../Dialogs/dialog-add-edit/dialog-add-edit.component';
import { Alquileres } from '../Interfaces/alquileres'; 
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from '../Dialogs/dialogo-delete/dialogo-delete.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { routes } from '../app.routes';
import { Route, Router } from '@angular/router';

export interface Alquiler{
  id: number;
  detalles_alquiler: string;
  precio_alquiler: number;
  fecha_alquiler: string;
  fecha_devolucion: string;
  id_cliente: number;
  placa_vehiculo: string;
}

@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatPaginatorModule, MatIconModule, MatButtonModule,MatFormFieldModule, MatInputModule,MatDialogModule,MatSelectModule,MatToolbarModule ],
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
})
export class AlquilerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'detalles_alquiler',
    'precio_alquiler',
    'fecha_alquiler',
    'fecha_devolucion',
    'placa_vehiculo',
    'id_cliente',
    'acciones'
  ];

  // MatTableDataSource con filtro
  dataSource = new MatTableDataSource<Alquileres>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedRow!: Alquileres | null;

  constructor(private AlquilerServiceService: AlquilerServiceService, public dialog:MatDialog, private _snackbar : MatSnackBar, private route:Router ) {}

  ngOnInit(): void {
    this.MostrarAlquileres();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  MostrarAlquileres(): void {
    this.AlquilerServiceService.getAlquileres().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
       this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error completo:', error);
      }
    });
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // Método para filtrar la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  dialogoNuevoAlquiler(){
    this.dialog.open(DialogAddEditComponent, {disableClose:true,
      width: "350px"
    }).afterClosed().subscribe(resultado =>{
      if (resultado === "creado"){
        this.MostrarAlquileres()
      }
    })
  }

  editar(dataAlquiler:Alquiler){
    this.dialog.open(DialogAddEditComponent, {
      disableClose:true,
      width: "350px",
      data:dataAlquiler
    }).afterClosed().subscribe(resultado =>{
      if (resultado === "actualizado"){
        this.MostrarAlquileres()
      }
    })
  }

  MostrarAlerta(msg: string, accion: string) {
    this._snackbar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  eliminarAlquilar(dataAlquiler: Alquiler){
    this.dialog.open(DialogoDeleteComponent, {
      disableClose:true,
      data:dataAlquiler
    }).afterClosed().subscribe(resultado =>{
      if (resultado === "eliminar"){
        this.AlquilerServiceService.deleteAlquiler(dataAlquiler.id).subscribe({
          next: (data) =>{
               this.MostrarAlerta("alquiler eliminado", "correctamente")
               this.MostrarAlquileres()
          }
        })

      } 
    })
  }
  go_to_home(url:string):void{
    this.route.navigate([url])
  }
}
