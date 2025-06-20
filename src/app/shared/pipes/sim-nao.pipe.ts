import { Pipe, PipeTransform } from '@angular/core';
import { TransacaoFinanceiraDTO } from '../models/transacao-financeira-dto';

@Pipe({
  name: 'SimNaoPipe',
  standalone: true // Se estiver utilizando Angular standalone components
})
export class SimNaoPipe implements PipeTransform {

  transform(value?: boolean ): string {
    console.log('SimNaoPipe transform called with value:', value);
    if (value === null || value === undefined) return '';
    return value ? 'Sim' : 'Não';
  }

}
