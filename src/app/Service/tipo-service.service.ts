import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipos } from '../Interfaces/tipos';
@Injectable({
  providedIn: 'root'
})
export class TipoServiceService {
   private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTipo():Observable<Tipos[]>{
    return  this.http.get<Tipos[]>(`${this.apiUrl}/tipos`);
  }
  createTipo(modelo:Tipos):Observable<any>{
    return this.http.post(`${this.apiUrl}/tipos`,modelo)
  }
  updateTipo(id_tipo: number, modelo: Tipos): Observable<any> {
    return this.http.put(`${this.apiUrl}/tipos/${id_tipo}`, modelo);
  }
  deleteTipo(id_tipo: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tipos/${id_tipo}`); 
  }
}
