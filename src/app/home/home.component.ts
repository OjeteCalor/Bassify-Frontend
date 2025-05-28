import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private spotifyAuth: SpotifyAuthService) {}

  loginWithSpotify() {
    this.spotifyAuth.redirectToSpotifyLogin();
  }
}
