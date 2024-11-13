import { Component } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  date = new Date(); // Armazena a data atual para ser usada no template.

  constructor(private authService: AuthService) {}

  loginSOE() {
    this.authService.setCurrentLoginMethod('soe');
    this.authService.login();
  }

  loginCidadao() {
    this.authService.setCurrentLoginMethod('cidadao');
    this.authService.login();
  }
}
