import { Injectable } from '@angular/core';
import { TransacaoFinanceiraDTO } from '../../../../shared/models/transacao-financeira-dto';
import { BaseService } from '../../../../core/base/base.service';
import { HttpClient } from '@angular/common/http';
import { CategoriaTransacaoFinanceiraDTO } from '../models/categoria-transacao-financeira-dto';
import { Observable } from 'rxjs';
import { PaginationRequest } from '../../../../shared/models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class TransacaoFinanceiraService extends BaseService<TransacaoFinanceiraDTO> {

  constructor(public override http: HttpClient) {
    super(http)
  }

  getCategorias(): Observable<CategoriaTransacaoFinanceiraDTO[]> {
    return this.http.get<CategoriaTransacaoFinanceiraDTO[]>(`${this.baseUrl}/categoria`);
  }

  override getListPaginate(pagina: number, total: number): Observable<PaginationRequest> {
    const login = localStorage.getItem('user') ?? '';
      return this.http.get<PaginationRequest>(this.baseUrl + '?asc=true&pagina=' + pagina + '&tamanhoPagina=' + total + '&login=' + login, { headers: this.headers });
    }

  public getPathModule(): string {
    return '/receitas-despesas';
  }
}
