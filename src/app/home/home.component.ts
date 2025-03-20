import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { Router, RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import { VehiculosService } from '../Service/vehiculos-service.service';
import { AlquilerComponent } from '../alquiler/alquiler.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router){}
  @ViewChild('sidenav') sidenav!: MatSidenav;
  toggleMenu() {
    this.sidenav.toggle();
  }

  Ir_Vehiculos(url:string):void{
    console.log(url)
     this.router.navigate([url])
  }
  ir_clientes(url:string):void{
    console.log(url)
    this.router.navigate([url])
  }
got_to_alquiler(url:string):void{
  console.log(url)
  this.router.navigate([url])
}
got_to_clientesList(url:string):void{
  console.log(url)
  this.router.navigate([url])
}
got_to_vehiculosList(url:string):void{
  console.log(url)
  this.router.navigate([url])
}
got_to_alquileresList(url:string):void{
  console.log(url)
  this.router.navigate([url])
}
}
