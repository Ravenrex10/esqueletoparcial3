import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadService } from '../../services/entidad.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Entidad } from '../../interfaces/entidad';
import { UploadPhotoComponent } from '../upload-photo/upload-photo.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-info-entidad',
  standalone: true,
  imports: [FormsModule, UploadPhotoComponent, MapComponent],
  templateUrl: './info-entidad.component.html',
  styleUrl: './info-entidad.component.css',
  providers: [EntidadService]
})
export class InfoEntidadComponent implements OnInit {

  idEntidad = "";
  entidad :any;
  datestring : string = '';
  entidadEditar : Entidad = {
    _id: '',
    nombre: '',
    timestamp: new Date(),
    lugar: '',
    lat: 0,
    lon: 0,
    organizador: '',
    imagen: ''
  };
  loggedIn = false;
  email : any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private entidadService: EntidadService, private router: Router){}

  ngOnInit(){
    this.email = localStorage.getItem('email');
    if(this.email !=null && this.email != undefined){
      this.loggedIn = true;
    }
    this.route.params.subscribe(params => {
      this.idEntidad = params['idEntidad'];
    });

    this.entidadService.getEntidadInfo(this.idEntidad).subscribe(entidad => {
      this.entidad = entidad;
    })
  }

  editar(data: any): void{
    this.entidadEditar.nombre = data.nombre;
    this.entidadEditar.timestamp = new Date(data.timestamp);
    this.entidadEditar.organizador = data.organizador;
    this.entidadEditar.lugar = data.lugar;
    this.entidadEditar.nombre = data.nombre;
    this.entidadEditar._id = this.idEntidad;
    this.entidadService.getCoordenadas(data.lugar).subscribe(response => {
      this.entidadEditar.lat = response['latitud'];
      this.entidadEditar.lon = response['longitud'];
      console.log(this.entidadEditar);
      this.entidadService.editEntidad(this.entidad._id, this.entidadEditar).subscribe(respuesta =>{
        
      });
    })
    
  }

  eliminar(): void{
    console.log("hola");
    this.entidadService.deleteEntidad(this.idEntidad).subscribe(response => {
      this.router.navigate(['/crud']);
    });
  }
  redirectMapa(): void{
    this.router.navigate(['/map']);
  }
}
