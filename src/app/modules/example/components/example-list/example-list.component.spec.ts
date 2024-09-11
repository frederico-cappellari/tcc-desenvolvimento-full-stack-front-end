import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ExampleListComponent } from './example-list.component';

describe('ExampleListComponent', () => {
  let component: ExampleListComponent;
  let fixture: ComponentFixture<ExampleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleListComponent, HttpClientTestingModule],
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

    fixture = TestBed.createComponent(ExampleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
