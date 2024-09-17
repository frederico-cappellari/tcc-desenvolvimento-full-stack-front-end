import { Routes } from '@angular/router';
import { LoginComponent } from './core/layouts/login/login.component';
import { StandardComponent } from './core/layouts/standard/standard.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'exemplo/lista', pathMatch: 'full' },
  {
    path: 'exemplo',
    loadChildren: () => import('./modules/example/example.routes').then(r => r.ExampleRoutes),
    canMatch: [AuthGuard],
    component: StandardComponent,
  },
  { path: 'logout', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
];
