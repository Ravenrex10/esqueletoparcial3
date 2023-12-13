import { Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { MapComponent } from './features/map/map.component';

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
    }
];
