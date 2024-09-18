import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ExemploEditComponent } from './exemplo-edit.component';

describe('ExemploEditComponent', () => {
  let component: ExemploEditComponent;
  let fixture: ComponentFixture<ExemploEditComponent>;

  beforeEach(async () => {
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
          },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExemploEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


