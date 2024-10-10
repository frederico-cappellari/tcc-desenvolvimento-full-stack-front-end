import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginationRequest } from '../../shared/models/pagination.model';


export abstract class BaseService<T> {

  constructor(public http: HttpClient) { }

  public abstract getPathModule(): string;

  public getById(id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/' + id, { headers: this.headers });
  }

  public getListPaginate(pagina: number, total: number): Observable<PaginationRequest> {
    return this.http.get<PaginationRequest>(this.baseUrl + '?asc=true&pagina=' + pagina + '&tamanhoPagina=' + total, { headers: this.headers });
  }

  public findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl, { headers: this.headers });
  }

  public getListAll(id: number): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + '/list/' + id, { headers: this.headers });
  }

  public getListSearch(obj: T | null): Observable<T[]> {
    return this.http.post<T[]>(this.baseUrl + '/search', obj, { headers: this.headers });
  }

  public create(obj: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, obj, { headers: this.headers });
  }

  public update(obj: T, id: number): Observable<T> {
    return this.http.put<T>(this.baseUrl + '/' + id, obj, { headers: this.headers });
  }

  public patchUpdate(obj: T, id: number): Observable<T> {
    return this.http.patch<T>(this.baseUrl + '/' + id, obj, { headers: this.headers });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id, { headers: this.headers });
  }

  public deleteAll(ids: number[]): Observable<any> {
    const params = '?ids=' + ids.join('&ids=');
    return this.http.delete(this.baseUrl + '/all' + params, { headers: this.headers });
  }

  public get baseUrl(): string {
    return environment.apiUrl + this.getPathModule();
  }

  public get headers(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", 'application/json');
    return headers;
  }
}
