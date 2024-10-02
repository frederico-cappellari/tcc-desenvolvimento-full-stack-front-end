import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { ExemploResolver } from './exemplo.resolver';
import { ExemploService } from '../services/exemplo.service';

describe('ExemploResolver', () => {
  let resolver: ExemploResolver;
  let service: ExemploService;

  beforeEach(() => {
    service = {
      getById: jest.fn()
    } as unknown as ExemploService;

    TestBed.configureTestingModule({
      providers: [
        ExemploResolver,
        { provide: ExemploService, useValue: service }
      ]
    });

    resolver = TestBed.inject(ExemploResolver);
  });

  it('should resolve data from the service', (done) => {
    const mockId = '1';
    const mockResponse = { id: mockId, nome: 'Aluno 1' };
    const route = new ActivatedRouteSnapshot();
    route.params = { id: mockId };

    (service.getById as jest.Mock).mockReturnValue(of(mockResponse));

    resolver.resolve(route).subscribe((result) => {
      expect(result).toEqual(mockResponse);
      expect(service.getById).toHaveBeenCalledWith(mockId);
      done();
    });
  });
});
