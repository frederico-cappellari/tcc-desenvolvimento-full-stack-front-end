import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ExemploEditComponent } from './exemplo-edit.component';
import { ExemploService } from '../../services/exemplo.service';
import { of } from 'rxjs';

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
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<ExemploService>;

    await TestBed.configureTestingModule({
      imports: [ExemploEditComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                entity: {  /* Simule aqui o valor esperado para 'entity' */ },
              },
            },
            mockActivatedRoute
          },
        },
        { provide: ExemploService, useValue: exemploService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExemploEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


