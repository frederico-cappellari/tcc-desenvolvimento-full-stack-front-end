import { Routes } from '@angular/router';
import { ExampleEditComponent } from './components/example-edit/example-edit.component';
import { ExampleListComponent } from './components/example-list/example-list.component';
import { ExampleResolver } from './resolver/example.resolver';

export const ExampleRoutes: Routes = [

  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'lista',
        component: ExampleListComponent,
      },
      {
        path: 'adicionar',
        component: ExampleEditComponent,
      },
      {
        path: ':id',
        component: ExampleEditComponent,
        resolve: { entity: ExampleResolver }
      },
    ]
  },
];
