import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', // Define o serviço como provido na raiz do aplicativo, tornando-o acessível em todo o app.
})
export class AuthService {

  urlLogin = ''; // URL para rota de login;

  constructor(private http: HttpClient) { }

  // Armazena a URL de redirecionamento no sessionStorage.
  setRedirectTo(redirectTo: string): void {
    sessionStorage.setItem('redirectto', redirectTo);
  }

  // Recupera a URL de redirecionamento armazenada no sessionStorage.
  getRedirectTo(): string | null {
    return sessionStorage.getItem('redirectto');
  }

  // Remove o token JWT do sessionStorage.
  cleanJWT(): void {
    sessionStorage.removeItem('token.jwt');
  }

  // Retorna o token JWT armazenado ou faz uma requisição para obtê-lo.
  async getJWT(): Promise<any> {
    const token = sessionStorage.getItem('token.jwt'); // Verifica se o token já está armazenado.
    if (token) {
      return Promise.resolve('token'); // Retorna o token se estiver disponível.
    }
  }

  // Método para realizar a autorização (login) do usuário.
  autorize(params: any): Promise<any> {
    const urlParams = new URLSearchParams(params).toString(); // Converte os parâmetros de login em uma string de consulta.
    const url = `${environment.apiUrl}${this.urlLogin}?${urlParams}`; // Monta a URL completa da API de login.
    return firstValueFrom(
      this.http.get(url, { withCredentials: true, observe: 'response' }) // Faz a requisição HTTP de login.
        .pipe(
          switchMap((response: any) => {
            const token = response.headers.get('X-Token'); // Obtém o token do cabeçalho da resposta.

            if (token) {
              try {
                sessionStorage.setItem('token.jwt', token); // Armazena o token no sessionStorage.
                return of(response.body.url); // Retorna a URL de redirecionamento.
              } catch (e) {
                return throwError(() => new Error('Erro ao salvar database(token.jwt): ' + e)); // Lida com erro ao salvar o token.
              }
            } else {
              return throwError(() => new Error('Token não encontrado na resposta.')); // Lança erro se o token não for encontrado.
            }
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
              return throwError(() => new Error('Erro de conexão.')); // Lança erro em caso de erro de conexão.
            } else {
              const errorMessage = error.error?.error?.message || 'Erro desconhecido.'; // Captura a mensagem de erro da resposta.
              return throwError(() => new Error(errorMessage)); // Lança erro com mensagem apropriada.
            }
          })
        )
    );
  }

  // Método auxiliar para lidar com erros de requisição.
  private handleError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Erro de conexão com o servidor de autenticação.'; // Retorna mensagem de erro de conexão.
    } else if (error.status === 403) {
      return 'Erro 403 - Acesso negado.'; // Retorna mensagem de acesso negado.
    } else {
      return `Erro ao comunicar com o servidor de autenticação: ${error.message}`; // Retorna mensagem de erro geral.
    }
  }

  // Método para realizar o logout do usuário.
  async logout(): Promise<void> {
    try {
      if (environment.production) {
        await lastValueFrom(this.http.get(environment.apiUrl + '/logout')); // Faz a requisição de logout se estiver em produção.
      }
      this.cleanJWT(); // Limpa o token JWT do sessionStorage.
    } catch (error: any) {
      throw new Error(error.message); // Lança um erro em caso de falha no logout.
    }
  }
}
