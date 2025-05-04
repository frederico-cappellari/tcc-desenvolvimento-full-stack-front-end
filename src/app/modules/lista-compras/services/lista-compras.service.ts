import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../../core/base/base.service';
import { PaginationRequest } from '../../../shared/models/pagination.model';
import { ItemCompraDTO } from '../../../shared/models/item-compra-dto';

@Injectable({
  providedIn: 'root',
})
export class ListaComprasService extends BaseService<ItemCompraDTO> {

  constructor(public override http: HttpClient) {
    super(http)
  }

  override getListPaginate(pagina: number, total: number): Observable<PaginationRequest> {
    const login = localStorage.getItem('user') ?? '';
      return this.http.get<PaginationRequest>(this.baseUrl + '?asc=true&pagina=' + pagina + '&tamanhoPagina=' + total + '&login=' + login, { headers: this.headers });
    }

  public getPathModule(): string {
    return '/lista-compras';
  }
}
