import { AfterViewInit, Component } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-oauth',
  standalone: true,
  imports: [],
  templateUrl: './oauth.component.html',
  styleUrl: './oauth.component.css'
})
export class OauthComponent implements AfterViewInit{
  idToken: any;
  constructor() { }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "236025958894-l05tha7iovc0ool81upch4i6gi91npe8.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleSignIn(response)
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { size: "large", type: "standard", shape: "pill" }  // customization attributes
    );
  }

  handleGoogleSignIn(response: any) {
    console.log(response.credential);

    // This next is for decoding the idToken to an object if you want to see the details.
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(JSON.parse(jsonPayload));

    //this.idToken = google.requestAccessToken();
    this.idToken = google.accounts.oauth2;
    console.log(this.idToken);


    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'localhost:8000/logged');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() { console.log('Signed in as: ' + xhr.responseText); };
    xhr.send('idtoken=' + this.idToken)
    console.log('Token enviado')
  }
}
