import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Entidad } from '../interfaces/entidad';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(private http: HttpClient) { }

  urlBackend = 'http://localhost:8000'

  getEntidadInfo(idEntidad: string): Observable<any> {
    const url = this.urlBackend + '/api/entidad/' + idEntidad + '/';
    return this.http.get<any>(url);
  }

  uploadImage(idEntidad: string, datos: string):Observable<any> {
    const url = this.urlBackend + '/api/entidad/' + idEntidad + '/';
    return this.http.put(url, datos);
  }

  editEntidad(idEntidad : string, entidad: Entidad): Observable<any> {
    const url = this.urlBackend + "/api/entidad/" + idEntidad + "/";
    console.log("Hola");
    return this.http.put(url, entidad);
  }

  deleteProducto(entidadId: string): Observable<any> {
    const url = this.urlBackend + '/api/entidad/'+entidadId;
    return this.http.delete<any>(url);
  }

  getAllEntidades():Observable<any> {
    const url = this.urlBackend + '/api/entidad';
    return this.http.get<any>(url);
  }

  createEntidad(entidad: Entidad): Observable<Entidad> {
    const url = this.urlBackend + '/api/entidad';
    return this.http.post<Entidad>(url, entidad);
  }
}
