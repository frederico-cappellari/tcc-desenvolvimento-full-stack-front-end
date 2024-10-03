import { Routes } from '@angular/router';
import { AbasComponent } from './components/abas/abas.component';
import { AcordeaoComponent } from './components/acordeao/acordeao.component';
import { ArrastaSoltaComponent } from './components/arrasta-solta/arrasta-solta.component';
import { BarraProgressoComponent } from './components/barra-progresso/barra-progresso.component';
import { CarrosselComponent } from './components/carrossel/carrossel.component';
import { ClassificavelComponent } from './components/classificavel/classificavel.component';
import { ExemploEditComponent } from './components/exemplo-edit/exemplo-edit.component';
import { ExemploListComponent } from './components/exemplo-list/exemplo-list.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { ModalComponent } from './components/modal/modal.component';
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
        path: 'formulario',
        children: [
          { path: '', redirectTo: 'adicionar', pathMatch: 'full' },
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
      {
        path: 'abas',
        component: AbasComponent,
      },
      {
        path: 'acordeao',
        component: AcordeaoComponent,
      },
      {
        path: 'arrasta-e-solta',
        component: ArrastaSoltaComponent,
      },
      {
        path: 'barra-de-progresso',
        component: BarraProgressoComponent,
      },
      {
        path: 'carrossel',
        component: CarrosselComponent,
      },
      {
        path: 'classificavel',
        component: ClassificavelComponent,
      },
      {
        path: 'grafico',
        component: GraficoComponent,
      },
      {
        path: 'modal',
        component: ModalComponent,
      },
    ]
  },
];
