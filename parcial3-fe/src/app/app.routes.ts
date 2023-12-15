import { Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { MapComponent } from './features/map/map.component';
import { OauthComponent } from './features/oauth/oauth.component';
import { UploadPhotoComponent } from './features/upload-photo/upload-photo.component';
import { ListaComponent } from './features/lista/lista.component';
import { InfoEntidadComponent } from './features/info-entidad/info-entidad.component';

export const routes: Routes = [
    {
        path: '',
        component: ListaComponent,
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
    },
    {
        path:'crud/:idEntidad',
        component: InfoEntidadComponent,
        title: 'Información'
    }
];
