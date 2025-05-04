import { Injectable } from '@angular/core';
import { BaseService } from '../../../../core/base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationRequest } from '../../../../shared/models/pagination.model';
import { NotaFiscalDTO } from '../models/nota-fiscal-dto';

@Injectable({
  providedIn: 'root',
})
export class NotaFiscalService extends BaseService<NotaFiscalDTO> {

  constructor(public override http: HttpClient) {
    super(http)
  }

  override getListPaginate(pagina: number, total: number): Observable<PaginationRequest> {
    const login = localStorage.getItem('user') ?? '';
      return this.http.get<PaginationRequest>(this.baseUrl + '?asc=true&pagina=' + pagina + '&tamanhoPagina=' + total + '&login=' + login, { headers: this.headers });
    }

  public getPathModule(): string {
    return '/nota-fiscal';
  }
}
