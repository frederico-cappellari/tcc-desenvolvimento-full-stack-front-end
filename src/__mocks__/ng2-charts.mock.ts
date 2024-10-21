// src/__mocks__/ng2-charts.mock.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Crie uma versão simulada do BaseChartDirective
@NgModule({
  imports: [CommonModule],
  exports: [],
})
export class BaseChartDirective {
  // Adicione métodos ou propriedades simuladas, se necessário
}

// Exportação padrão, caso seja necessário para os testes
export default BaseChartDirective;