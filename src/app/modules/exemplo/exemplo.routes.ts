import { Routes } from '@angular/router';
import { ExemploEditComponent } from './components/exemplo-edit/exemplo-edit.component';
import { ExemploListComponent } from './components/exemplo-list/exemplo-list.component';
import { ExemploResolver } from './resolver/exemplo.resolver';

export const ExemploRoutes: Routes = [

  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'lista',
        component: ExemploListComponent,
      },
      {
        path: 'adicionar',
        component: ExemploEditComponent,
      },
      {
        path: ':id',
        component: ExemploEditComponent,
        resolve: { entity: ExemploResolver }
      },
    ]
  },
];
