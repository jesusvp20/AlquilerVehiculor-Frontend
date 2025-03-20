import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ClienteServiceService } from '../Service/cliente-service.service';
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
import { CommonModule } from '@angular/common';
import { DialogoCreateComponent } from '../Dialogs/dialogo-create-edit-cliente/dialogo-create.component';
import { DialogoDeleteClienteComponent } from '../Dialogs/dialogo-delete-cliente/dialogo-delete-cliente.component';

export interface Cliente {
  id?: number;
  nombre_cliente: string;
  numero_documento: string;
  telefono: string;
  email?: string;
  fecha_registro?: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre_cliente', 'numero_documento', 'telefono', 'email', 'fecha_registro', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _clientesService: ClienteServiceService,
    private route: Router,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cargarClientes();
  }

  cargarClientes() {
    this._clientesService.getClientes().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error cargando clientes:', error);
      }
    });
  }

  go_to_home(url: string): void {
    this.route.navigate([url]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  dialogoNuevoCliente() {
    this.dialog.open(DialogoCreateComponent, {
      disableClose: true,
      width: "350px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.cargarClientes();  
      }
    });
  }

  openDialog() {
    this.dialog.open(DialogoCreateComponent);
  }

  editar(cliente: Cliente) {
    this.dialog.open(DialogoCreateComponent, {
      disableClose: true,
      width: "350px",
      data: cliente
    }).afterClosed().subscribe(resultado => {
      if (resultado === "actualizado") {
        this.cargarClientes();
      }
    });
  }

  MostrarAlerta(msg: string, accion: string) {
    this._snackbar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  eliminarCliente(dataCliente: Cliente) {
    this.dialog.open(DialogoDeleteClienteComponent, {
      disableClose: true,
      data: dataCliente
    }).afterClosed().subscribe(resultado => {
      if (resultado === "eliminar") {
        if (dataCliente.id !== undefined) {
          this._clientesService.deleteCliente(dataCliente.id!).subscribe({
            next: (data) => {
              this.MostrarAlerta("cliente eliminado", "correctamente");
              this.cargarClientes();
            },
            error: (error) => {
              this.MostrarAlerta("Error al eliminar cliente", "ERROR");
            }
          });
        }
      }
    });
  }
}
