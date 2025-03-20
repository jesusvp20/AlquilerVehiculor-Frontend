import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { VehiculosService } from '../Service/vehiculos-service.service';
import { TipoServiceService } from '../Service/tipo-service.service';
import { Vehiculos } from '../Interfaces/vehiculos';
import { Tipos } from '../Interfaces/tipos';
import { DialogoCreateVehiculosComponent } from '../Dialogs/dialogo-create-vehiculos/dialogo-create-vehiculos.component';
@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './lista-vehiculos.component.html',
  styleUrls: ['./lista-vehiculos.component.css']
})
export class ListaVehiculosComponent implements OnInit {
  vehiculos: Vehiculos[] = [];
  filteredVehiculos: Vehiculos[] = [];
  tipos: Tipos[] = [];
  currentSort: string = 'precio';

  constructor(
    private vehiculosService: VehiculosService,
    private tipoService: TipoServiceService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadVehiculos();
    this.loadTipos();
  }

  loadVehiculos(): void {
    this.vehiculosService.getVehiculo().subscribe({
      next: (data: Vehiculos[]) => {
        this.vehiculos = data;
        this.filteredVehiculos = [...this.vehiculos];
        this.sortVehiculos(this.currentSort);
      },
      error: (err) => {
        console.error('Error al cargar vehículos:', err);
      }
    });
  }

  loadTipos(): void {
    this.tipoService.getTipo().subscribe({
      next: (data: Tipos[]) => {
        this.tipos = data;
      },
      error: (err) => {
        console.error('Error al cargar tipos:', err);
      }
    });
  }

  sortVehiculos(criteria: string): void {
    this.currentSort = criteria;
    this.filteredVehiculos.sort((a, b) => {
      if (criteria === 'precio') {
        return a.precio_alquiler - b.precio_alquiler;
      } else if (criteria === 'estado') {
        return (a.estado || '').localeCompare(b.estado || '');
      } else {
        return 0;
      }
    });
  }

  onSortChange(criteria: string): void {
    this.sortVehiculos(criteria);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue) {
      this.filteredVehiculos = this.vehiculos.filter(v =>
        (v.modelo_vehiculo?.toLowerCase() || '').includes(filterValue) ||
        v.placa.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredVehiculos = [...this.vehiculos];
    }
    this.sortVehiculos(this.currentSort);
  }

  getTipoName(id: number): string {
    const tipo = this.tipos.find((t: Tipos) => t.id_tipo === id);
    return tipo ? tipo.nombre_tipo : id.toString();
  }

  openRentalDialog(vehiculo?: Vehiculos): void {
    this.dialog.open(DialogoCreateVehiculosComponent, {
      width: '500px',
      data: vehiculo || null
    }).afterClosed().subscribe(result => {
      if (result === 'alquilado') {
        this.loadVehiculos();
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  showAlert(msg: string, action: string): void {
    this.snackBar.open(msg, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/default-car.png';
  }
}
