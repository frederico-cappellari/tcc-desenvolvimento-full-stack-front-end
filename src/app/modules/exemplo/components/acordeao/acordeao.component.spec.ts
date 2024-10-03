import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcordeaoComponent } from './acordeao.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AcordeaoComponent', () => {
  let component: AcordeaoComponent;
  let fixture: ComponentFixture<AcordeaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcordeaoComponent],
      providers: [provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AcordeaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
