import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ExemploListComponent } from './exemplo-list.component';
import { of } from 'rxjs';
import { ExemploService } from '../../services/exemplo.service';

describe('ExemploListComponent', () => {
  let component: ExemploListComponent;
  let fixture: ComponentFixture<ExemploListComponent>;
  let exemploService: ExemploService;

  let loading: jest.Mock;
  let loaded: jest.Mock;
  let alertConfirmation: jest.Mock;
  let confirmation: jest.Mock;
  let handleError: jest.Mock;

  beforeEach(async () => {
    exemploService = {
      getExemplo: jest.fn().mockReturnValue([]),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ExemploService>;

    await TestBed.configureTestingModule({
      imports: [ExemploListComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Simulação de um parâmetro de rota, por exemplo, o ID
            // params: of({ id: '123' }),
          },
        },
        { provide: ExemploService, useValue: exemploService },
      ],
    }).compileComponents();

    loading = jest.fn();
    loaded = jest.fn();
    alertConfirmation = jest.fn();
    confirmation = jest.fn();
    handleError = jest.fn();

    fixture = TestBed.createComponent(ExemploListComponent);
    component = fixture.componentInstance;
    exemploService = TestBed.inject(ExemploService);

    component.loading = loading;
    component.loaded = loaded;
    component.alertConfirmation = alertConfirmation;
    component.confirmation = confirmation;
    component.handleError = handleError;
    component.excluir = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initList on ngOnInit', () => {
    const initList = component.initList = jest.fn(() => {
      loading();
      component.entity = exemploService.getExemplo();
      loaded();
    });
    component.ngOnInit();

    expect(initList).toHaveBeenCalled();
  });

  it('should call excluir if confirmed', () => {
    const id = 1;
    alertConfirmation.mockReturnValue(of(true)); // Simulate confirmation

    component.confirmDelete(id);

    expect(alertConfirmation).toHaveBeenCalled();
    expect(component.excluir).toHaveBeenCalledWith(id);
  });

  it('should not call excluir if not confirmed', () => {
    const id = 1;
    alertConfirmation.mockReturnValue(of(false)); // Simulate cancellation

    component.confirmDelete(id);

    expect(alertConfirmation).toHaveBeenCalled();
    expect(component.excluir).not.toHaveBeenCalled();
  });

  it('should call initList', () => {
    component.initList();
    expect(component.loading).toHaveBeenCalled(); // Check if loading was called
    expect(component.loaded).toHaveBeenCalled(); // Check if loaded was called
  });
});