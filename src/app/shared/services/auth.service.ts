import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario) {
    return this.http.post<{token : string}>(`${environment.apiUrl}/login`, usuario);
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }
  
  getAccessToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  saveUsuario(usuario: Usuario) {
    localStorage.setItem('user', usuario.login); 
  }

  getUsuario(): string {
    const user = localStorage.getItem('user');
    return user ? user : '';
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); 
  }
}
