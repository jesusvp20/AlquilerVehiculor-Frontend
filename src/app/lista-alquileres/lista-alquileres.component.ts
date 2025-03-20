import { Component, ViewChild } from '@angular/core';
import { AlquilerServiceService } from '../Service/alquiler-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-alquileres',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './lista-alquileres.component.html',
  styleUrls: ['./lista-alquileres.component.css']
})
export class ListaAlquileresComponent {
  alquileres: any[] = [];
  sortedAlquileres: any[] = [];
  currentSort: string = 'fecha';

  @ViewChild('input') input: any;

  constructor(
    private alquilerService: AlquilerServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarAlquileres();
  }

  cargarAlquileres() {
    this.alquilerService.getAlquileres().subscribe({
      next: (data) => {
        this.alquileres = data;
        this.sortAlquileres(this.currentSort);
      },
      error: (error) => {
        console.error('Error cargando alquileres:', error);
      }
    });
  }

  sortAlquileres(criteria: string) {
    this.currentSort = criteria;
    this.sortedAlquileres = [...this.alquileres].sort((a, b) => {
      if (criteria === 'fecha') {
        return new Date(b.fecha_alquiler).getTime() - new Date(a.fecha_alquiler).getTime();
      } else {
        return b.precio_alquiler - a.precio_alquiler;
      }
    });
  }

  onSortChange(event: any) {
    this.sortAlquileres(event.value);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.sortedAlquileres = this.alquileres.filter(alquiler => 
      alquiler.detalles_alquiler.toLowerCase().includes(filterValue) ||
      alquiler.placa_vehiculo.toLowerCase().includes(filterValue) ||
      alquiler.id_cliente.toString().includes(filterValue)
    );
    this.sortAlquileres(this.currentSort);
  }

  getStatusClass(alquiler: any): string {
    const endDate = new Date(alquiler.fecha_devolucion);
    const today = new Date();
    return endDate < today ? 'completed' : 'active';
  }

  getStatusIcon(alquiler: any): string {
    return this.getStatusClass(alquiler) === 'active' ? 'check_circle' : 'done_all';
  }



  go_to_home(url: string): void {
    this.router.navigate([url]);
  }
}