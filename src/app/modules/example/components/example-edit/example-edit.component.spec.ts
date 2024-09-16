import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ExampleEditComponent } from './example-edit.component';

describe('ExampleEditComponent', () => {
  let component: ExampleEditComponent;
  let fixture: ComponentFixture<ExampleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleEditComponent, HttpClientTestingModule],
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

    fixture = TestBed.createComponent(ExampleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


