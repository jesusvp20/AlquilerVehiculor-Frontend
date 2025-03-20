import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Alquileres } from '../Interfaces/alquileres';
@Injectable({
  providedIn: 'root'
})
export class AlquilerServiceService {
private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getAlquileres(): Observable<Alquileres[]> {
    return this.http.get<Alquileres[]>(`${this.apiUrl}/alquiler`);
  }
  createAlquiler(modelo: Alquileres): Observable<  any> {
    return this.http.post(`${this.apiUrl}/alquiler`, modelo);
  }
  getAlquilerById(id: number): Observable<Alquileres[]> {
    return this.http.get<Alquileres[]>(`${this.apiUrl}/alquiler/${id}`);
  }
  updateAlquiler(id: number, modelo: Alquileres): Observable<any> {
    return this.http.put(`${this.apiUrl}/alquiler/${id}`, modelo);
  }

  deleteAlquiler(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/alquiler/${id}`);
  }






}
