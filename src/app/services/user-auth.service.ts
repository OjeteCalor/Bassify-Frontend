// src/app/services/user-auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private apiUrl = 'http://localhost:8080/api/v1/account/login'; 

  constructor(private http: HttpClient) {}


  loginWithRefreshToken(refreshToken: string): Observable<any> {
    const userDto = { refreshToken }; 
    console.log("jajajaj"+refreshToken);
    return this.http.post<any>(this.apiUrl, userDto);
  }
}
