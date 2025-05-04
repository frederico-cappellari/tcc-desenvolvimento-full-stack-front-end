import { Component } from "@angular/core";
import { Router } from '@angular/router';

import { AuthService } from "../../../shared/services/auth.service";
import { Usuario } from "../../../shared/models/usuario.model";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";


@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, FormsModule ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  formLogin: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { 
    this.formLogin = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required])
    });
  }

  login() {
    if (this.formLogin.valid) {
      const usuario: Usuario = this.formLogin.value;
      this.authService.login(usuario).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.authService.saveUsuario(usuario);
          this.router.navigate(['gestao-financeira/home']); // redireciona após login
        },
        error: (error) => {
          alert('Email ou senha inválidos');
        }
      });
    }
  }
}
