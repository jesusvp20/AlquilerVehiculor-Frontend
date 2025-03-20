import { Routes } from '@angular/router';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AlquilerComponent } from './alquiler/alquiler.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { HomeComponent } from './home/home.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { ListaAlquileresComponent } from './lista-alquileres/lista-alquileres.component';
export const routes: Routes = [  { path: 'clientes', component: ClientesComponent },
    { path: 'vehiculos', component: VehiculosComponent },
    { path: 'alquileres', component: AlquilerComponent },
    {path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'lista_clientes', component: ListaClientesComponent},
    {path: 'lista_alquileres', component: ListaAlquileresComponent},
    {path: 'lista_vehiculos', component: ListaVehiculosComponent},
    
    { path: '**', component: PageNotFoundComponentComponent },
];
