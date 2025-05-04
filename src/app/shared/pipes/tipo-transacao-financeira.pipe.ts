import { Pipe, PipeTransform } from '@angular/core';
import { TransacaoFinanceiraDTO } from '../models/transacao-financeira-dto';

@Pipe({
  name: 'TipoTransacaoFinanceiraPipe',
  standalone: true // Se estiver utilizando Angular standalone components
})
export class TipoTransacaoFinanceiraPipe implements PipeTransform {

  transform(value?: TransacaoFinanceiraDTO): string | undefined {
    let retorno = ""
    if (value?.tipo === "RECEITA") { 
      retorno = 'Receita';
    } else if (value?.tipo === "DESPESA") {
      retorno = 'Despesa'; 
    }
    if (value?.recorrente) {
      retorno += ' Rec.';
    }
    return retorno ? retorno : 'Tipo não encontrado';
  }

}
