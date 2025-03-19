import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthInterceptor, OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppComponent implements OnInit {
  title = 'APM.Angular18';

  constructor(public oidcSecurityService: OidcSecurityService, private authService: AuthService) { }

  ngOnInit() {
    this.oidcSecurityService.checkAuth('', this.authService.getConfigId()).subscribe(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        console.error('Autenticação falhou');
        console.error('Commit teste nova branch');
      }
    });
  }
}
