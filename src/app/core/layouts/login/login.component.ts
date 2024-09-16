import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
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
export class LoginComponent implements OnInit {
  loginForm: any = {
    usuario: '', // Campo para o nome de usuário.
    senha: '', // Campo para a senha.
  };
  invalido = ''; // Mensagem de erro exibida em caso de falha no login.
  loading = false; // Indica se a operação de login está em andamento.
  date = new Date(); // Armazena a data atual para ser usada no template.
  recoverActive = false; // Campo para o CPF usado na recuperação de senha.
  recover: any = {
    cpf: '',
  };

  constructor(
    private authService: AuthService, // Serviço de autenticação injetado para realizar operações de login e logout.
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.logout(); // Executa o logout, removendo qualquer sessão ativa.
  }

  // Método chamado ao tentar realizar o login
  async login(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página).
    this.loading = true; // Define o estado de loading como verdadeiro, exibindo o componente de loading.
    this.invalido = ''; // Reseta a mensagem de erro.
    try {
      const redirectUrl = await this.authService.autorize(this.loginForm); // Tenta autenticar o usuário com os dados do formulário.
      if (!redirectUrl) {
        window.location.href = redirectUrl; // Se houver uma URL de redirecionamento, redireciona o usuário.
      } else {
        this.router.navigate(['/']); // Se não houver redirecionamento, navega para a rota raiz ('/').
      }
    } catch (error) {
      this.loading = false; // Se houver erro, desativa o estado de loading.
      this.invalido = error
        ? `${error}.` // Exibe a mensagem de erro, se houver.
        : 'Erro ao tentar acessar o Servidor, contate o Administrador do Sistema.'; // Exibe uma mensagem padrão em caso de erro no servidor.
    }
  }

  // Método para alternar a seção de recuperação de senha
  recoverPassword(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página).
    this.recover.cpf = ''; // Reseta o campo CPF da recuperação de senha.
    this.recover.active = !this.recover.active; // Alterna o estado da seção de recuperação de senha.
  }
}
