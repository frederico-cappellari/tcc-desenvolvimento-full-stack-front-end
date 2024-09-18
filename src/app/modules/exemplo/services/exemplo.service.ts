import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/base/base.service';
import { Select } from '../../../shared/models/select.model';
import { Exemplo } from '../models/examplo.model';

const ALUNOS: Exemplo[] = [
  {
    id: 1,
    nome: 'Aluno 1',
    matricula: 17075200,
    curso: 2,
    ano: 3,
  },
  {
    id: 2,
    nome: 'Aluno 2',
    matricula: 17075200,
    curso: 2,
    ano: 3,
  },
  {
    id: 3,
    nome: 'Aluno 3',
    matricula: 17075200,
    curso: 1,
    ano: 2,
  },
  {
    id: 4,
    nome: 'Aluno 4',
    matricula: 17075200,
    curso: 3,
    ano: 1,
  },
];

const CURSOS: Select[] = [
  { id: 1, label: 'Robótica' },
  { id: 2, label: 'Informática' },
  { id: 3, label: 'Eletrônica' },
  { id: 4, label: 'Mecânica' },
];

@Injectable({
  providedIn: 'root',
})
export class ExemploService extends BaseService<Exemplo> {

  constructor(public override http: HttpClient) {
    super(http)
  }

  getExemplo(): Exemplo[] {
    return ALUNOS;
  }

  getCursos(): Select[] | any {
    return CURSOS;
  }

  public getPathModule(): string {
    return '/exemplo';
  }
}
