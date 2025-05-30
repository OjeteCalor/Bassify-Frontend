import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyAuthService } from '../../services/spotify-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule,
			FormsModule
  ],
})
export class LoginComponent {

	constructor(private spotifyAuth: SpotifyAuthService) {}


	loginWithSpotify() {
    this.spotifyAuth.redirectToSpotifyLogin();
  	}



}
