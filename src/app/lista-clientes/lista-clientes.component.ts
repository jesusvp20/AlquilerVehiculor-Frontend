import { Component, ViewChild } from '@angular/core';
import { ClienteServiceService } from '../Service/cliente-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent {
  clientes: any[] = [];
  sortedClientes: any[] = [];

  @ViewChild('input') input: any;

  constructor(private _clientesService: ClienteServiceService,private router: Router) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this._clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.sortedClientes = this.sortClientesByDate(data);
      },
      error: (error) => {
        console.error('Error cargando clientes:', error);
      }
    });
  }

  private sortClientesByDate(clientes: any[]): any[] {
    return [...clientes].sort((a, b) => 
      new Date(b.fecha_registro).getTime() - new Date(a.fecha_registro).getTime()
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.sortedClientes = this.sortClientesByDate(
      this.clientes.filter(cliente => 
        cliente.nombre_cliente.toLowerCase().includes(filterValue) ||
        cliente.numero_documento.includes(filterValue) ||
        (cliente.email && cliente.email.toLowerCase().includes(filterValue))
      )
    );
  }
  go_to_home(url: string): void {
    this.router.navigate([url]);
  }
}