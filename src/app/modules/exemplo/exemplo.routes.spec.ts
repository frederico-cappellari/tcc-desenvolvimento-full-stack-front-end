import { AbasComponent } from './components/abas/abas.component';
import { AcordeaoComponent } from './components/acordeao/acordeao.component';
import { ArrastaSoltaComponent } from './components/arrasta-solta/arrasta-solta.component';
import { BarraProgressoComponent } from './components/barra-progresso/barra-progresso.component';
import { CarrosselComponent } from './components/carrossel/carrossel.component';
import { ClassificavelComponent } from './components/classificavel/classificavel.component';
import { ExemploEditComponent } from './components/exemplo-edit/exemplo-edit.component';
import { ExemploListComponent } from './components/exemplo-list/exemplo-list.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ModalComponent } from './components/modal/modal.component';
import { ExemploRoutes } from './exemplo.routes';
import { ExemploResolver } from './resolver/exemplo.resolver';

describe('ExemploRoutes', () => {
  it('should have correct routes defined', () => {
    expect(ExemploRoutes).toEqual([
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
            path: 'mapa',
            component: MapaComponent,
          },
          {
            path: 'modal',
            component: ModalComponent,
          },
        ]
      },
    ]);
  });

  it('should redirect empty path to lista', () => {
    const route = ExemploRoutes.find(r => r.path === '');
    expect(route).toBeTruthy();
    expect(route?.redirectTo).toBe('lista');
    expect(route?.pathMatch).toBe('full');
  });

  it('should have correct child routes defined', () => {
    const parentRoute = ExemploRoutes.find(r => r.path === '' && r.children);
    expect(parentRoute).toBeTruthy();

    const childrenRoute = parentRoute?.children;
    expect(childrenRoute).toBeTruthy();
    expect(Array.isArray(childrenRoute)).toBe(true);
    expect(childrenRoute?.length).toBe(11); // número de rotas
  });

  it('should define the correct components for the routes', () => {
    const parentRoute = ExemploRoutes.find(r => r.path === '' && r.children);
    expect(parentRoute).toBeTruthy();
    const childrenRoute = parentRoute?.children;

    if (childrenRoute) {
      expect(childrenRoute[0].component).toBe(ExemploListComponent);
      expect(childrenRoute[1].children![1].component).toBe(ExemploEditComponent);
      expect(childrenRoute[1].children![2].component).toBe(ExemploEditComponent);
      expect(childrenRoute[1].children![2].resolve).toEqual({ entity: ExemploResolver });
      expect(childrenRoute[2].component).toBe(AbasComponent);
      expect(childrenRoute[3].component).toBe(AcordeaoComponent);
      expect(childrenRoute[4].component).toBe(ArrastaSoltaComponent);
      expect(childrenRoute[5].component).toBe(BarraProgressoComponent);
      expect(childrenRoute[6].component).toBe(CarrosselComponent);
      expect(childrenRoute[7].component).toBe(ClassificavelComponent);
      expect(childrenRoute[8].component).toBe(GraficoComponent);
      expect(childrenRoute[9].component).toBe(MapaComponent);
      expect(childrenRoute[10].component).toBe(ModalComponent);
    }
  });
});
