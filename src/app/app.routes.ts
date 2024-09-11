import { Routes } from '@angular/router';
import { LoginComponent } from './core/layouts/login/login.component';
import { StandardComponent } from './core/layouts/standard/standard.component';
import { UsuarioAutenticadoGuard } from './shared/guards/usuario-autenticado.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'exemplo/lista', pathMatch: 'full' },
  {
    path: 'exemplo',
    loadChildren: () => import('./modules/example/example.routes').then(r => r.ExampleRoutes),
    canActivate: [UsuarioAutenticadoGuard],
    component: StandardComponent,
  },
  { path: 'logout', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
];
