import { Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { MapComponent } from './features/map/map.component';
import { OauthComponent } from './features/oauth/oauth.component';
import { UploadPhotoComponent } from './features/upload-photo/upload-photo.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent,
        title: 'Inicio'
    },
    {
        path: 'map',
        component: MapComponent,
        title: 'Mapa'
    },
    {
        path: 'upload',
        component: UploadPhotoComponent,
        title: 'Upload'
    }
];
