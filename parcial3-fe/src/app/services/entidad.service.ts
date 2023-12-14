import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(private http: HttpClient) { }

  urlBackend = 'http://localhost:8000/'

  getEntidadInfo(idEntidad: string): Observable<any> {
    const url = this.urlBackend + '/api/entidad/' + idEntidad + '/';
    return this.http.get<any>(url);
  }

  uploadImage(idEntidad: string, datos: string):Observable<any> {
    const url = this.urlBackend + '/api/entidad/' + idEntidad + '/';
    return this.http.put(url, datos);
  }
}
