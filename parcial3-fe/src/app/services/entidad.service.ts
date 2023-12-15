import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Entidad } from '../interfaces/entidad';
import { CodigoPostal} from  '../interfaces/codigoPostal';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(private http: HttpClient) { }

  urlBackend = 'http://localhost:8000'

  codigoPostal : CodigoPostal = {
    codigoPostal: ""
  }

  getEntidadInfo(idEntidad: string): Observable<any> {
    const url = this.urlBackend + '/api/entidad/' + idEntidad + '/';
    return this.http.get<any>(url);
  }

  uploadImage(idEntidad: string, photoUrl: string):void {
    const url = this.urlBackend + '/api/entidad/' + idEntidad + '/';
    this.getEntidadInfo(idEntidad).subscribe(response =>{
      response['imagen'] = photoUrl;
      console.log(response);
      console.log(photoUrl);
      return this.http.put(url, response).subscribe(response => {
        console.log(response);
      });
    });
  }

  editEntidad(idEntidad : string, entidad: Entidad): Observable<any> {
    const url = this.urlBackend + "/api/entidad/" + idEntidad + "/";
    console.log("Hola");
    return this.http.put(url, entidad);
  }

  deleteEntidad(entidadId: string): Observable<any> {
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

  getEventosProximos(codigoPostal: any): Observable<any> {
    const url = this.urlBackend + '/api/entidad/proximos';

    this.codigoPostal.codigoPostal = codigoPostal; 
    console.log(this.codigoPostal);
    return this.http.post<any>(url, this.codigoPostal);
  }

  getCoordenadas(codigoPostal: any): Observable<any> {
    const url = this.urlBackend + '/api/entidad/coordenadas/'+codigoPostal;
    return this.http.get<any>(url);
  }
}
