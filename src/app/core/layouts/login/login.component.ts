import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { AuthService } from "../../../shared/services/auth.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  date = new Date(); // Armazena a data atual para ser usada no template.

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }
}
