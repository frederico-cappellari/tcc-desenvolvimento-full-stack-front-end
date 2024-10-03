import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrastaSoltaComponent } from './arrasta-solta.component';

describe('ArrastaSoltaComponent', () => {
  let component: ArrastaSoltaComponent;
  let fixture: ComponentFixture<ArrastaSoltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrastaSoltaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrastaSoltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
