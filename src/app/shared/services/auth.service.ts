import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root', // Define o serviço como provido na raiz do aplicativo, tornando-o acessível em todo o app.
})
export class AuthService {

  constructor(
    public oidcSecurityService: OidcSecurityService,
  ) { }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

  getAccessToken(){
    return this.oidcSecurityService.getAccessToken();
  }

  getUserInfo(){
    return this.oidcSecurityService.getUserData();
  }

}
