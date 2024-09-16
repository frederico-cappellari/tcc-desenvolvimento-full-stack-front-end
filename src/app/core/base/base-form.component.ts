import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "./base.component";

export abstract class BaseFormComponent<T> extends BaseComponent {

  actionLabel = 'Novo';
  form: FormGroup = new FormGroup({});
  _entity: T;

  constructor(public activatedRoute: ActivatedRoute) {
    super();
    this._entity = this.activatedRoute.snapshot.data['entity'];
  }

  fieldMessageRequired(field: string): boolean | undefined {
    return this.form && this.form.get(field)?.invalid && this.form.get(field)?.dirty;
  }

  fieldErros(field: string) {
    return this.form.controls[field]?.errors;
  }

  markAsDirty() {
    if (this.form) {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control) {
          control.markAsDirty();
        }
      });
      setTimeout(() => {
        this._scrollToError();
      }, 0);
    }
  }

  _scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]') as HTMLElement | null;
    if (firstElementWithError) {
      this._scrollTo(firstElementWithError);
    }
  }

  _scrollTo(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /**
    * #################### ###
    * ## Getters e Setters ##
    * #######################
    */

  get entity(): T {
    return this._entity;
  }

  set entity(_value) {
    this._entity = _value;
  }

}
