import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntidadService } from '../../services/entidad.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Entidad } from '../../interfaces/entidad';

@Component({
  selector: 'app-info-entidad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './info-entidad.component.html',
  styleUrl: './info-entidad.component.css',
  providers: [EntidadService]
})
export class InfoEntidadComponent implements OnInit {

  idEntidad = "";
  entidad :any;
  datestring : string = '';
  entidadEditar : Entidad = {
    nombre: '',
    photoUrls: [],
    date: new Date(),
    boolean: false,
    double: 0,
    inte: 0
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private entidadService: EntidadService){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.idEntidad = params['idEntidad'];
    });

    this.entidadService.getEntidadInfo(this.idEntidad).subscribe(entidad => {
      this.entidad = entidad;
    })
  }

  editar(data: any): void{
    this.entidadEditar.boolean = this.entidad.boolean;
    this.entidadEditar.date = new Date(data.date);
    this.entidadEditar.double = Number(data.double);
    this.entidadEditar.inte = Number(this.entidad.inte);
    this.entidadEditar.nombre = data.nombre;
    this.entidadEditar.photoUrls = this.entidad.photoUrls;
    this.entidadService.editEntidad(this.entidad._id, this.entidadEditar).subscribe(response =>{
      
    });
  }
}
