import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/base/base.service';
import { TransacaoFinanceiraDTO } from '../../../shared/models/transacao-financeira-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceitaDespesaMesService extends BaseService<TransacaoFinanceiraDTO> {

  constructor(public override http: HttpClient) {
    super(http);
  }

  public getExtrato(): Observable<TransacaoFinanceiraDTO[]> {
    const login = localStorage.getItem('user') ?? '';
    const dataAtual = new Date();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const mesAno = `${mes}/${ano}`;
    const params = new HttpParams().set('login', login.trim()).set('mesAno', mesAno);
    return this.http.get<TransacaoFinanceiraDTO[]>(`${this.baseUrl}/extrato-mensal`, { params });
  }

  public getPathModule(): string {
    return '/receitas-despesas';
  }
}
