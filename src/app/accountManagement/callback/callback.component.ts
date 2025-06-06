import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthService } from '../../services/spotify-auth.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-callback',
  template: `<p>Iniciando sesión con Spotify...</p>`
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyAuth: SpotifyAuthService,
    private userAuth: UserAuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.spotifyAuth.getToken(code).subscribe({
          next: (spotifyResponse: any) => {
            const refreshToken = spotifyResponse.refresh_token;

            this.userAuth.loginWithRefreshToken(refreshToken).subscribe({
              next: (backendResponse) => {
                console.log('Refresh token enviado al backend correctamente');
                console.log('Respuesta del backend:', backendResponse);
                localStorage.setItem('spotifyId', backendResponse.spotifyId);
                this.router.navigate(['/acc/first-preferences']);
              },
              error: (err) => {
                console.error('Error enviando refresh token al backend:', err);
              }
            });
          },
          error: (err) => {
            console.error('Error al obtener el token de Spotify:', err);
          }
        });
      }
    });
  }
}
