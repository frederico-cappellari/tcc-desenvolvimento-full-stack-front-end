import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ExemploPipe',
  standalone: true // Se estiver utilizando Angular standalone components
})
export class ExemploPipe implements PipeTransform {

  // O array de cursos pode ser importado ou definido aqui
  private readonly CURSOS: { id: number, label: string }[] = [
    { id: 1, label: 'Robótica' },
    { id: 2, label: 'Informática' },
    { id: 3, label: 'Eletrônica' },
    { id: 4, label: 'Mecânica' },
  ];

  transform(value: number): string | undefined {
    const curso = this.CURSOS.find(curso => curso.id === value);
    return curso ? curso.label : 'Curso não encontrado';
  }

}
