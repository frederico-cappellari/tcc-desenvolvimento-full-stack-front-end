import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthInterceptor, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
})
export class AppComponent implements OnInit {
  title = 'APM.Angular18';

  constructor(public oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        console.error('Autenticação falhou');
      }
    });
  }
}
