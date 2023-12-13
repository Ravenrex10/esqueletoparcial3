import { Component } from '@angular/core';
import { OauthComponent } from '../oauth/oauth.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [OauthComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
