import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificavelComponent } from './classificavel.component';

describe('ClassificavelComponent', () => {
  let component: ClassificavelComponent;
  let fixture: ComponentFixture<ClassificavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificavelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
