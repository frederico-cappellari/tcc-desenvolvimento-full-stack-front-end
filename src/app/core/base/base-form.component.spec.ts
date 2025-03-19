import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseFormComponent } from './base-form.component';
import { Component } from '@angular/core';

@Component({
  template: '', // Add a simple template for the test component
})
class TestFormComponent extends BaseFormComponent<any> {
  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }
}

describe('BaseFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { entity: {} } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;

    Element.prototype.scrollIntoView = jest.fn();
    jest.useFakeTimers(); // Use Jest's fake timers
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers(); // Restore real timers
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all controls as dirty', () => {
    component.form = new FormGroup({
      nome: new FormControl(''),
      matricula: new FormControl(''),
    });

    component.markAsDirty();
    expect(component.form.controls['nome'].dirty).toBe(true);
    expect(component.form.controls['matricula'].dirty).toBe(true);
  });

  it('should set entity correctly', () => {
    const newEntity = { id: 1, name: 'Test Entity' };
    component.entity = newEntity; // Use the setter
    expect(component.entity).toEqual(newEntity); // Verify the entity is set
  });

  describe('_scrollTo', () => {
    it('should call scrollIntoView on the provided element', () => {
      const element = document.createElement('div');
      element.scrollIntoView = jest.fn();
      component['_scrollTo'](element);

      expect(element.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    });
  });

  describe('_scrollToError', () => {
    it('should call _scrollTo if an invalid element exists', () => {
      // Create a mock element with the required classes and attributes
      const errorElement = document.createElement('div');
      errorElement.classList.add('ng-invalid');
      errorElement.setAttribute('formControlName', 'testField');
      document.body.appendChild(errorElement); // Append to body to simulate DOM presence

      const scrollToSpy = jest.spyOn(component, '_scrollTo'); // Spy on _scrollTo method

      component['_scrollToError'](); // Call the method

      expect(scrollToSpy).toHaveBeenCalledWith(errorElement); // Check if _scrollTo was called with the error element

      // Cleanup
      errorElement.remove();
    });

    it('should do nothing if no invalid element exists', () => {
      const scrollToSpy = jest.spyOn(component, '_scrollTo'); // Spy on _scrollTo method

      component['_scrollToError'](); // Call the method

      expect(scrollToSpy).not.toHaveBeenCalled(); // Check that _scrollTo was not called
    });
  });

  describe('markAsDirty', () => {
    it('should call _scrollToError after marking controls as dirty', () => {
      const scrollToErrorSpy = jest.spyOn(component, '_scrollToError'); // Spy on _scrollToError method

      component.markAsDirty(); // Call the method

      jest.runAllTimers(); // Fast-forward time to execute the setTimeout callback

      expect(scrollToErrorSpy).toHaveBeenCalled(); // Check if _scrollToError was called
    });
  });
});
