import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { EntidadService } from '../../services/entidad.service';

@Component({
  selector: 'app-upload-photo',
  standalone: true,
  imports: [],
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.css'
})
export class UploadPhotoComponent {
  idEntidad: any;
  datos: any = {};
  url: any = '';
  selectedFiles: File[] = [];
  foto_subida: boolean = false;
  error: boolean = false;
  error_no_hay_imagen: boolean = false;


  constructor(private http: HttpClient, private route: ActivatedRoute, private imageService: ImageService, private router: Router, private entidadService: EntidadService) { }

  ngOnInit(): void {
    this.foto_subida = false;
    this.route.params.subscribe((params: any) => {
      this.idEntidad = params['id'];
      console.log('ID del usuario:', this.idEntidad);
    });

    this.entidadService.getEntidadInfo(this.idEntidad).subscribe((usuario: any) => {
      this.datos = usuario;
      console.log(this.datos);
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Ensure only the first file is taken
      this.selectedFiles.push(input.files[0]);
    }
  }

  onButtonClicked(): void {
    this.foto_subida = false;
    this.error = false;
    this.error_no_hay_imagen = false;
    if (this.selectedFiles.length > 0) {
      this.imageService.uploadImage(this.selectedFiles).subscribe(response => { //AÑADE LA FOTO A CLOUDINARY
        if (response) {
          console.log(response);
          this.url = response.urls[0];

          this.datos.fotoURL = this.url;
          this.entidadService.uploadImage(this.idEntidad, this.datos)   //AÑADE LA FOTO A LA ENTIDAD
            .subscribe(
              (respuesta) => {
                console.log('Perfil actualizado con éxito:', respuesta);
                this.foto_subida = true;
              },
              (error) => {
                console.error('Error al actualizar el perfil:', error);
                this.error = true;
              });
        }
      });
    }
    else {
      this.error_no_hay_imagen = true;
    }
  }

  onButtonVolverClicked()
  {
    this.router.navigate(['/inicio/']); //MODIFICAR A DONDE QUEREMOS REDIRIGIRNOS

  }


  guardarCambios() {

  }
}
