import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentLoginMethod: string | null = 'soe';

  constructor(private oidcSecurityService: OidcSecurityService,) { }

  // Define o método de autenticação
  setCurrentLoginMethod(method: string) {
    window.sessionStorage.setItem('currentLoginMethod', method);
  }

  // Retorna o configId com base no método de login atual
  public getConfigId(): string {
    this.currentLoginMethod = window.sessionStorage.getItem('currentLoginMethod');
    return this.currentLoginMethod === 'soe' ? environment.soeauth.configId : environment.loginCidadao.configId;
  }

  login() {
    // Usa o configId correto para iniciar a autenticação
    const configId = this.getConfigId();
    this.oidcSecurityService.authorize(configId);
  }

  logout() {
    const configId = this.getConfigId();
    this.oidcSecurityService.logoff(configId).subscribe((result) => console.log(result));
  }

  getAccessToken() {
    const configId = this.getConfigId();
    return this.oidcSecurityService.getAccessToken(configId);
  }

  getUserInfo() {
    const configId = this.getConfigId();
    return this.oidcSecurityService.getUserData(configId);
  }
}
