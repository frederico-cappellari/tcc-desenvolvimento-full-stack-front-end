import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-message',
  standalone: true,
  imports: [],
  templateUrl: './field-message.component.html',
  styleUrl: './field-message.component.scss'
})
export class FieldMessageComponent {

  @Input() field: boolean | undefined = false;
  @Input() textErroServer: string = '';
  @Input() erros: any;
  text: string = '';

  textVerify(erro: any): boolean {
    if (erro) {
      Object.keys(erro).forEach(key => {
        this.text = '';

        if (key == 'required') {
          this.text = 'Campo obrigatório';
        }

        if (key == 'minlength') {
          this.text = `O campo não pode ter menos que ${this.erros[key]?.requiredLength} caracteres`;
        }

        if (key == 'maxlength') {
          this.text = `O campo não pode ter mais que ${this.erros[key]?.requiredLength} caracteres`;
        }

        if (key == 'email') {
          this.text = `O campo precisa ser um e-mail válido`;
        }

      })
      return true;
    }
    return false;
  }
}
