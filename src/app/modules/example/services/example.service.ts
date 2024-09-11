import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/base/base.service';
import { Select } from '../../../shared/models/select.model';
import { Country } from '../models/example.model';

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    area: 17075200,
    population: 146989754,
    continent: 4,
  },
  {
    name: 'Canada',
    area: 9976140,
    population: 36624199,
    continent: 2,
  },
  {
    name: 'United States',
    area: 9629091,
    population: 324459463,
    continent: 2,
  },
  {
    name: 'China',
    area: 9596960,
    population: 1409517397,
    continent: 3,
  },
];

const CONTINENTS: Select[] = [
  { id: 1, label: 'África' },
  { id: 2, label: 'América' },
  { id: 3, label: 'Ásia' },
  { id: 4, label: 'Europa' },
  { id: 5, label: 'Oceania' },
  { id: 6, label: 'Antártida' },
];

@Injectable({
  providedIn: 'root',
})
export class ExampleService extends BaseService<Country> {

  constructor(public override http: HttpClient) {
    super(http)
  }

  getCountry(): Country[] {
    return COUNTRIES;
  }

  getContinents(): Select[] | any {
    return CONTINENTS;
  }

  public getPathModule(): string {
    return '/example';
  }
}
