import { Routes } from '@angular/router';
import { LoginComponent } from './core/layouts/login/login.component';
import { StandardComponent } from './core/layouts/standard/standard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ReceitaDespesaComponent } from './modules/cadastro/receita-despesa/components/receita-despesa/receita-despesa.component';

export const routes: Routes = [
  { path: '', redirectTo: 'gestao-financeira/home', pathMatch: 'full' },
  {
    path: 'gestao-financeira',
    loadChildren: () => import('./modules/gestao-financeira.routes').then(r => r.GestaoFinanceiraRoutes),
    canMatch: [AuthGuard],
    component: StandardComponent,
  },
  { path: 'logout', redirectTo: 'login' },
  { path: 'login', component: LoginComponent }
];
