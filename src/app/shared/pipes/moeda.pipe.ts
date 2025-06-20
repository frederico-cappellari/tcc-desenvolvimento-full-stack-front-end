import { Pipe, PipeTransform } from '@angular/core';
import { TransacaoFinanceiraDTO } from '../models/transacao-financeira-dto';

@Pipe({
  name: 'MoedaPipe',
  standalone: true // Se estiver utilizando Angular standalone components
})
export class MoedaPipe implements PipeTransform {

  transform(valor: number | string | null | undefined): string {
  const numero = Number(valor);

  if (isNaN(numero)) return 'R$ 0,00';

  return 'R$ ' + numero
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
