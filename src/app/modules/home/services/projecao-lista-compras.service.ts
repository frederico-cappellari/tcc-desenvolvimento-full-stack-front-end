import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/base/base.service';
import { TransacaoFinanceiraDTO } from '../../../shared/models/transacao-financeira-dto';
import { Observable } from 'rxjs';
import { ItemCompraDTO } from '../../../shared/models/item-compra-dto';
import { GastoMensalDTO } from '../models/gasto-mensal-dto';

@Injectable({
  providedIn: 'root',
})
export class ProjecaoListaComprasService extends BaseService<TransacaoFinanceiraDTO> {

  constructor(public override http: HttpClient) {
    super(http);
  }

  public getListaDeCompras(): Observable<ItemCompraDTO[]> {
    const login = localStorage.getItem('user') ?? '';
    return this.http.get<ItemCompraDTO[]>(`${this.baseUrl}lista-compras/${login}`);
  }

  public getHistoricoReceitasDespesas(): Observable<GastoMensalDTO[]> {
    const login = localStorage.getItem('user') ?? '';
    return this.http.get<GastoMensalDTO[]>(`${this.baseUrl}receitas-despesas/historico-semestre/${login}`);
  }

  public getPathModule(): string {
    return '/';
  }
}
