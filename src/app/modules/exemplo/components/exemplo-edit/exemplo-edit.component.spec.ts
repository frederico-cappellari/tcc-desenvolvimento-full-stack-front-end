import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ExemploService } from '../../services/exemplo.service';
import { ExemploEditComponent } from './exemplo-edit.component';

describe('ExemploEditComponent', () => {
  let component: ExemploEditComponent;
  let fixture: ComponentFixture<ExemploEditComponent>;
  let exemploService: jest.Mocked<ExemploService>;
  const mockActivatedRoute = {
    params: of({}),
  };

  beforeEach(async () => {
    exemploService = {
      getCursos: jest.fn().mockReturnValue([]),
      create: jest.fn().mockReturnValue(of({})),
      update: jest.fn().mockReturnValue(of({})),
      patchUpdate: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<ExemploService>;

    await TestBed.configureTestingModule({
      imports: [ExemploEditComponent, HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                entity: { id: 1, nomeAlu: 'Teste', curso: 1, ano: 2023, data: '26/10/2023' }, // Provide mock entity
              },
            },
            ...mockActivatedRoute
          },
        },
        { provide: ExemploService, useValue: exemploService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExemploEditComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on init', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('should patch form if entity exists', () => {
    const entity = { id: 1, nomeAlu: 'Teste', curso: 1, ano: 2023, data: '26/10/2023' };
    component.entity = entity;
    component.form.get('id')?.enable();
    component.ngOnInit();
  });

  it('should format data on getDataCreate', () => {
    const date = new Date(2023, 9, 26);
    component.form.patchValue({ data: date });
    const data = component.getDataCreate();
    expect(data.data).toBe('26/10/2023'); // Assuming formataData returns 'dd/MM/yyyy'
  });

  it('should call create service when saving a new entity', async () => {
    const createSpy = jest.spyOn(exemploService, 'create');
    component.entity = {};
    component.form.patchValue({ nomeAlu: 'Teste', curso: 1, ano: 2023, data: '26/10/2023' });
    component.salvar();
    await fixture.whenStable(); // Aguarda operações assíncronas
    expect(createSpy).toBeTruthy();
  });

  it('should call patchUpdate service when saving an existing entity', async () => {
    const patchUpdateSpy = jest.spyOn(exemploService, 'patchUpdate');
    const entity = { id: 1, nomeAlu: 'Teste', curso: 1, ano: 2023, data: '26/10/2023' };
    component.entity = entity;
    component.form.patchValue(entity);
    component.salvar();
    await fixture.whenStable(); // Aguarda operações assíncronas
    expect(patchUpdateSpy).toBeTruthy();
  });

  it('should show success message on save success', async () => {
    const msgSuccessSpy = jest.spyOn(component, 'msgSuccess');
    component.onSaveSuccess();
    await fixture.whenStable(); // Aguarda operações assíncronas
    expect(msgSuccessSpy).toHaveBeenCalled();
  });

  it('should show error message on save error', () => {
    const msgErrorSpy = jest.spyOn(component, 'msgError');
    component.onSaveError({});
    expect(msgErrorSpy).toHaveBeenCalled();
  });
});

