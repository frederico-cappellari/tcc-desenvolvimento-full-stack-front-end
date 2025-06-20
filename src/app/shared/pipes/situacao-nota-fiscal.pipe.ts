import { Pipe, PipeTransform } from '@angular/core';
import { NotaFiscalDTO } from '../../modules/cadastro/nota-fiscal/models/nota-fiscal-dto';

@Pipe({
  name: 'SituacaoNotaFiscalPipe',
  standalone: true // Se estiver utilizando Angular standalone components
})
export class SituacaoNotaFiscalPipe implements PipeTransform {

  transform(value?: NotaFiscalDTO): string | undefined {
    let retorno = ""
    if (value?.situacao === "PROCESSADA") { 
      retorno = 'Processada';
    } else if (value?.situacao === "NAO_PROCESSADA") {
      retorno = 'Não Processada'; 
    } else if (value?.situacao === "PROCESSADA_NAO_ENCONTRADA") {
      retorno = 'Processada Não Encontrada'; 
    }
    return retorno ? retorno : 'Tipo não encontrado';
  }

}
