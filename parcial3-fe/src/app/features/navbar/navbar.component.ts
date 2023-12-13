import { Component } from '@angular/core';
import { OauthComponent } from '../oauth/oauth.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [OauthComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
