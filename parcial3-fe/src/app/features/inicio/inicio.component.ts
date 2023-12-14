import { Component, OnInit } from '@angular/core';
import { OauthComponent } from '../oauth/oauth.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [OauthComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  token = localStorage.getItem("token");

  constructor(private router: Router){}
  
  ngOnInit(): void {
    console.log("token: ", this.token);
    if (this.token == undefined || this.token == null) {
      this.router.navigate(['/login']);
    }
  }
}
