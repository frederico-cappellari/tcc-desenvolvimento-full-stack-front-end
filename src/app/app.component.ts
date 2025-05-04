import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthInterceptor } from './shared/services/auth.interceptor';
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
  title = 'Gestão Financeira';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      console.error('Autenticação falhou');
    }
  }
}
