import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ExemploListComponent } from './exemplo-list.component';

describe('ExemploListComponent', () => {
  let component: ExemploListComponent;
  let fixture: ComponentFixture<ExemploListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemploListComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Simulação de um parâmetro de rota, por exemplo, o ID
            //params: of({ id: '123' }),
          },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExemploListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
