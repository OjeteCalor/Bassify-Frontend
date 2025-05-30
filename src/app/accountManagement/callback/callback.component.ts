import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthService } from '../../services/spotify-auth.service';

@Component({
  selector: 'app-callback',
  template: `<p>Cargando...</p>`,
  standalone: false
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyAuth: SpotifyAuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.spotifyAuth.getToken(code).subscribe((response: any) => {
          const accessToken = response.access_token;
          localStorage.setItem('access_token', accessToken);
          console.log('Token:', accessToken);
          this.router.navigate(['/discover']); 
        });
      }
    });
  }
}
