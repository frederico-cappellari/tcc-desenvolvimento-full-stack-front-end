import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ExemploService } from '../services/exemplo.service';

@Injectable({
  providedIn: 'root'
})
export class ExemploResolver implements Resolve<boolean> {

  constructor(private service: ExemploService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.service.getById(route.params['id']);
  }
}