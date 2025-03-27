import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

//Tipos de style para o botão
const typeButton = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  light: 'light',
  dark: 'dark',
  link: 'link',
};

enum sizeButton  {
  SMALL = 'small',
  LARGE = 'large',
}

@Component({
  selector: 'app-button',
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() classBtn = typeButton.primary;
  @Input() text = '';
  @Input() route = '';
  @Input() size = '';
  @Input() disabled = false;

  public get isLarge() {
    return Boolean(this.size === sizeButton.LARGE);
  }

  public get isSmall() {
    return Boolean(this.size === sizeButton.SMALL);
  }

}
