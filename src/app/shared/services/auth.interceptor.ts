import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('login') === -1 && request.url.indexOf('public') === -1) {
      // Converte a Promise do token em um Observable com 'from'
      return from(this.authService.getJWT()).pipe(
        switchMap(token => {
          let changedRequest = request;

          // Cria o headerSettings a partir dos headers atuais
          const headerSettings: Record<string, string | string[]> = {};
          for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key) || '';
          }

          // Adiciona o token de autenticação se disponível
          if (token) {
            headerSettings['Authorization'] = 'Bearer ' + token;
          }

          // Cria novos headers com as configurações modificadas
          const newHeader = new HttpHeaders(headerSettings);
          changedRequest = request.clone({ headers: newHeader });

          // Passa o request modificado ao próximo handler
          return next.handle(changedRequest).pipe(
            catchError(error => this.handleAuthError(error))
          );
        })
      );
    } else {
      // Para URLs de login ou públicas, não é necessário modificar o request
      return next.handle(request);
    }
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 403) {
      this.router.navigate(['/']);
    } else if (error.status === 401) {
      this.authService.cleanJWT();
      this.router.navigate(['login']);
      return of(error.message);
    }
    throw error;
  }
}
