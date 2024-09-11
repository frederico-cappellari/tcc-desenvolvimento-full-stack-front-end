import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ExampleService } from '../services/example.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleResolver implements Resolve<boolean> {

  constructor(private service: ExampleService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.service.getById(route.params['id']);
  }
}