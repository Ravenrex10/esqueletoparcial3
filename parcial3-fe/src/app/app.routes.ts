import { Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { MapComponent } from './features/map/map.component';
import { OauthComponent } from './features/oauth/oauth.component';

export const routes: Routes = [
    {
        path: 'login',
        component: OauthComponent,
        title: 'Iniciar sesión'
    },
    {
        path: 'inicio',
        component: InicioComponent,
        title: 'Inicio'
    },
    {
        path: 'map',
        component: MapComponent,
        title: 'Mapa'
    }
];
