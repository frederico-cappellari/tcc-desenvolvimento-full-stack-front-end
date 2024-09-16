import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const UsuarioAutenticadoGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const location = inject(Location);
  return new Promise<boolean>((resolve) => {
    authService
      .getJWT()
      .then((token) => {
        const isAuthenticated = !!token;
        if (!isAuthenticated) {
          authService.setRedirectTo(router.url);
          resolve(router.navigate(['login']));
        } else {
          resolve(true);
        }
      })
      .catch(() => {
        authService.setRedirectTo(location.path());
        resolve(router.navigate(['login']));
      });
  });
};
