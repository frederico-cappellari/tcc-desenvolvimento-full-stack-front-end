import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMessageComponent } from './field-message.component';

describe('FieldMessageComponent', () => {
  let component: FieldMessageComponent;
  let fixture: ComponentFixture<FieldMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set text to "Campo obrigatório" for required error', () => {
    component.erros = { required: true };
    const result = component.textVerify(component.erros);
    expect(result).toBe(true);
    expect(component.text).toBe('Campo obrigatório');
  });

  it('should set text for minlength error', () => {
    component.erros = { minlength: { requiredLength: 5 } };
    const result = component.textVerify(component.erros);
    expect(result).toBe(true);
    expect(component.text).toBe('O campo não pode ter menos que 5 caracteres');
  });

  it('should set text for maxlength error', () => {
    component.erros = { maxlength: { requiredLength: 10 } };
    const result = component.textVerify(component.erros);
    expect(result).toBe(true);
    expect(component.text).toBe('O campo não pode ter mais que 10 caracteres');
  });

  it('should set text for email error', () => {
    component.erros = { email: true };
    const result = component.textVerify(component.erros);
    expect(result).toBe(true);
    expect(component.text).toBe('O campo precisa ser um e-mail válido');
  });

  it('should textVerify to return false', () => {
    expect(component.textVerify(false)).toEqual(false);
  });
});
