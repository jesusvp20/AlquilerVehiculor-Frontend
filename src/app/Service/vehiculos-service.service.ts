import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Vehiculos } from '../Interfaces/vehiculos';
@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehiculo(): Observable<Vehiculos[]> {
    return this.http.get<Vehiculos[]>(`${this.apiUrl}/vehiculos`);
  }

  getByPlaca(placa: string): Observable<Vehiculos[]> {
    return this.http.get<Vehiculos[]>(`${this.apiUrl}/vehiculos/${placa}`)
    
  }

  createVehiculo(modelo: Vehiculos): Observable<Vehiculos> {
    return this.http.post<Vehiculos>(`${this.apiUrl}/vehiculos`, modelo);
  }
  getByTipo(id_tipo: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehiculos/tipos/${id_tipo}`);
  }

  updateVehiculo(placa: string, modelo: Vehiculos): Observable<any> {
    return this.http.put(`${this.apiUrl}/vehiculos/${placa}`, modelo);
  }

  deleteVehiculo(placa: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vehiculos/${placa}`);
  }
}
