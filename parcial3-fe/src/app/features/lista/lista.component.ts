import { Component, OnInit } from '@angular/core';
import { EntidadService } from '../../services/entidad.service';
import { CommonModule } from '@angular/common';
import { Entidad } from '../../interfaces/entidad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
  providers: [EntidadService]
})
export class ListaComponent implements OnInit {

  constructor(private entidadService: EntidadService, private router: Router) {}

  listaEntidades: any[] = [];

  ngOnInit(): void {
    this.entidadService.getAllEntidades().subscribe(entidades =>{
      this.listaEntidades = entidades;
      console.log(this.listaEntidades);
    });
  }

  redirectEntidad(idEntidad: string){
    this.router.navigate(['crud/'+idEntidad]);
  }
}