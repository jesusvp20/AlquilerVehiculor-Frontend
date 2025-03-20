import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Clientes } from '../Interfaces/clientes';
@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

createCliente(cliente: Clientes): Observable<any> {
  return this.http.post(`${this.apiUrl}/clientes`, cliente);
}
getClientes(): Observable<Clientes[]> {
  return this.http.get<Clientes[]>(`${this.apiUrl}/clientes`);
}

// Obtener un cliente por ID
getClienteById(id: number): Observable<Clientes> {
  return this.http.get<Clientes>(`${this.apiUrl}/clientes/${id}`);
}
updateCliente(id: number, modelo: Clientes): Observable<any> {
  return this.http.put(`${this.apiUrl}/clientes/${id}`, modelo);
}


deleteCliente(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/clientes/${id}`);
}


}


