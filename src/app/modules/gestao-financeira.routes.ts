import { Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { ReceitaDespesaComponent } from './cadastro/receita-despesa/components/receita-despesa/receita-despesa.component';
import { NotaFiscalComponent } from './cadastro/nota-fiscal/componentes/nota-fiscal/nota-fiscal.component';
import { ListaComprasComponent } from './lista-compras/componentes/lista-compras/lista-compras.component';

export const GestaoFinanceiraRoutes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'cadastro/receita-despesa', 
        component: ReceitaDespesaComponent
      },
      {
        path: 'cadastro/nota-fiscal', 
        component: NotaFiscalComponent
      },
      {
        path: 'lista-compras', 
        component: ListaComprasComponent
      }
    ]
  },
];
