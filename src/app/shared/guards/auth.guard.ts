import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return oidcSecurityService.isAuthenticated(authService.getConfigId()).pipe(
    take(1),
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
