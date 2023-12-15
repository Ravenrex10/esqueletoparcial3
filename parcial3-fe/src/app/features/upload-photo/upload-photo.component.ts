import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { EntidadService } from '../../services/entidad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.css',
  providers: [ImageService, EntidadService]
})
export class UploadPhotoComponent {
  selectedFiles: File[] = [];
  urls: any[] = [];
  fotos_subidas: boolean = false;
  idEntidad = '';

  constructor(
    private http: HttpClient,
    private imagenService: ImageService,
    private router: Router,
    private entidadService: EntidadService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.fotos_subidas = false;
  }

  // Cloudinary
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  onButtonClicked(): void {
    if (this.selectedFiles.length > 0) {
      this.imagenService.uploadImage(this.selectedFiles).subscribe(response => {
        if (response) {
          this.urls = response.urls;
          console.log(this.urls);
          this.fotos_subidas = true;
          this.route.params.subscribe(params => {
            this.idEntidad = params['idEntidad'];
            this.entidadService.uploadImage(this.idEntidad, this.urls[0]);
          });
        }
      });
    }
  }
}
