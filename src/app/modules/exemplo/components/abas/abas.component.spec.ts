import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbasComponent } from './abas.component';
import { provideAnimations } from '@angular/platform-browser/animations'; // Importa o provedor de animações

describe('AbasComponent', () => {
  let component: AbasComponent;
  let fixture: ComponentFixture<AbasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbasComponent],
      providers: [
        provideAnimations(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
