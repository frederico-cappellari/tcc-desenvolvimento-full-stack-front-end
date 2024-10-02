import { ExemploRoutes } from './exemplo.routes';
import { ExemploListComponent } from './components/exemplo-list/exemplo-list.component';
import { ExemploEditComponent } from './components/exemplo-edit/exemplo-edit.component';
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
    ]);
  });

  it('should redirect empty path to lista', () => {
    const route = ExemploRoutes.find(r => r.path === '');
    expect(route).toBeTruthy();
    expect(route?.redirectTo).toBe('lista');
    expect(route?.pathMatch).toBe('full');
  });

  it('should have child routes defined', () => {
    const parentRoute = ExemploRoutes.find(r => r.path === '' && r.children);
    expect(parentRoute).toBeTruthy();

    const childrenRoute = parentRoute?.children;
    expect(childrenRoute).toBeTruthy();
    expect(Array.isArray(childrenRoute)).toBe(true);
    expect(childrenRoute?.length).toBe(3);
  });

  it('should define the correct components for the routes', () => {
    const parentRoute = ExemploRoutes.find(r => r.path === '' && r.children);
    expect(parentRoute).toBeTruthy();
    const childrenRoute = parentRoute?.children;

    if (childrenRoute) {
      expect(childrenRoute[0].component).toBe(ExemploListComponent);
      expect(childrenRoute[1].component).toBe(ExemploEditComponent);
      expect(childrenRoute[2].component).toBe(ExemploEditComponent);
      expect(childrenRoute[2].resolve).toEqual({ entity: ExemploResolver });
    }
  });
});
