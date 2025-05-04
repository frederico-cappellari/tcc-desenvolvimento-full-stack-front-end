import { Pipe, PipeTransform } from '@angular/core';
import { TransacaoFinanceiraDTO } from '../models/transacao-financeira-dto';

@Pipe({
  name: 'MoedaPipe',
  standalone: true // Se estiver utilizando Angular standalone components
})
export class MoedaPipe implements PipeTransform {

  transform(value?: number ): string {
    if (value === null || value === undefined) return '';
    
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

}
