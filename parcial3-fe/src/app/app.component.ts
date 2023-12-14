import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/navbar/navbar.component';
import { OauthComponent } from './features/oauth/oauth.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, OauthComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'parcial3';
  loggedIn : any;
  token = localStorage.getItem("token");

  ngOnInit(): void {

    if(this.token!=null && this.token!=undefined){
      this.loggedIn = true;
    }
  }
}
