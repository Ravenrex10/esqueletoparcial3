import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  location = {latitude: 36.7213, longitude: -4.4213};
  marker1 = {latitude: 36.7213, longitude: -4.4213};
  marker2 = {latitude: 36.7213, longitude: -4.0};
  private map!: L.Map;

  constructor(private http: HttpClient, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.initMap(this.location);
    
    //this.updateMarkers([this.marker1, this.marker2])
  }

  private initMap(location: { latitude: number; longitude: number }): void {

    this.map = L.map('map').setView([this.location.latitude, this.location.longitude], 200);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'  
    }).addTo(this.map);
  
    /*L.marker([location.latitude, location.longitude])
      .addTo(map)
      .openPopup();*/

    /*L.circle([location.latitude, location.longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);*/
  }

  updateMarkers(markerLocations: { latitude: number; longitude: number }[]): void{
    for(const marker of markerLocations){
      this.location = marker;
      L.marker([marker.latitude, marker.longitude])
      .addTo(this.map)
      .openPopup();
    }
  }
}
