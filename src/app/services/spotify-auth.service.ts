import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SpotifyAuthService {
  clientId = environment.spotifyClientId;
  redirectUri = environment.spotifyRedirectUri;
  scope = environment.spotifyScope;

  codeVerifier = '';

  constructor(private http: HttpClient) {}

  // Genera un código aleatorio para el PKCE
  generateCodeVerifier(length = 128): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.codeVerifier = text;
    return text;
  }

  // Codifica el challenge a partir del verifier
  async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // Redirige al login de Spotify
  async redirectToSpotifyLogin() {
    const verifier = this.generateCodeVerifier();
    const challenge = await this.generateCodeChallenge(verifier);
    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      code_challenge_method: 'S256',
      code_challenge: challenge,
      show_dialog: 'true' // ✅ fuerza consentimiento → garantiza refresh_token
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  // Intercambia el code por access y refresh token
  getToken(code: string) {
    const verifier = localStorage.getItem('verifier') || '';
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('code_verifier', verifier);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('https://accounts.spotify.com/api/token', body.toString(), { headers });
  }
}
