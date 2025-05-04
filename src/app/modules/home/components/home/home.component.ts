import { CommonModule } from '@angular/common';
import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ReceitaDespesaMesService } from '../../services/receita-despesa-mes.service';
import { TransacaoFinanceiraDTO } from '../../../../shared/models/transacao-financeira-dto';
import { TipoTransacaoFinanceiraPipe } from '../../../../shared/pipes/tipo-transacao-financeira.pipe';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjecaoListaComprasService } from '../../services/projecao-lista-compras.service';
import { ItemCompraDTO } from '../../../../shared/models/item-compra-dto';
import { MoedaPipe } from '../../../../shared/pipes/moeda.pipe';
import { BaseChartDirective } from 'ng2-charts';
import { GastoMensalDTO } from '../../models/gasto-mensal-dto';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TooltipModule, TipoTransacaoFinanceiraPipe, MoedaPipe, BaseChartDirective],
  providers: [ReceitaDespesaMesService, ProjecaoListaComprasService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})

export class HomeComponent extends BaseComponent implements OnInit {

  constructor(private receitaDespesaMesService: ReceitaDespesaMesService, private projecaoListaComprasService: ProjecaoListaComprasService) {
    super();
  }

  public listaReceitasDespesasMes: TransacaoFinanceiraDTO[] = [];

  public listaProjecaoListaCompras: ItemCompraDTO[] = [];

  public gastosMensais: GastoMensalDTO[] = [];

  private loadItens : number = 0;

  private moedaPipe: MoedaPipe = new MoedaPipe();

  public getBalancoDoMes(): number {
    const totalReceitas = this.listaReceitasDespesasMes.filter((item) => item.tipo === 'RECEITA').map((item) => item.valor ?? 0).reduce((acc, valor) => acc + valor, 0);
    const totalDespesas = this.listaReceitasDespesasMes.filter((item) => item.tipo === 'DESPESA').map((item) => item.valor ?? 0).reduce((acc, valor) => acc + valor, 0);
    return (totalReceitas ?? 0) - (totalDespesas ?? 0);
  }

  public getTotalValorListaDeCompras(): number {
    return this.listaProjecaoListaCompras.map((item) => item.valorMedio ?? 0).reduce((acc, valor) => acc + valor, 0);
  }

  public getNumeroDeItensListaDeCompras(): number {
    return this.listaProjecaoListaCompras.length;
  }

  public getBalancoDoMesPosListaDeCompras(): number {
    return this.getBalancoDoMes() - this.getTotalValorListaDeCompras();
  }

  public getGraficoDeGastos() {
    let lineChart = {
      data: {
        labels: [] as string[],
        datasets: [
          {
            data: [] as number[],
            label: 'Total de Gastos Mensais',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)'
          }
        ]
      },
      options: {
        responsive: false
      },
      legend: true
    }
    this.gastosMensais.forEach((gasto) => {
      lineChart.data.labels.push(gasto.mes ?? '');
      lineChart.data.datasets[0].data.push(gasto.valor ?? 0);
    });
    return lineChart;
  }

  public getStyleBalanco(valor: number) : string {
    if (valor > 0) {
      return 'balanco-success';
    } else if (valor < 0) {
      return 'balanco-danger';
    } else {
      return 'balanco-warning';
    }
  }

  ngOnInit(): void {
    this.initList();
  }

  initList() {
    this.loading();
    this.addSub(
      this.receitaDespesaMesService.getExtrato().subscribe({
        next: (res) => {
          this.listaReceitasDespesasMes = res;
          this.loadItens++;
          this.verificarSeTodosOsItensCarregados();
        },
        error: (error) => {
          this.handleError(error);
        }
      })
    );
    this.addSub(
      this.projecaoListaComprasService.getListaDeCompras().subscribe({
        next: (res) => {
          this.listaProjecaoListaCompras = res;
          this.loadItens++;
          this.verificarSeTodosOsItensCarregados();
        },
        error: (error) => {
          this.handleError(error);
        }
      })
    );
    this.addSub(
      this.projecaoListaComprasService.getHistoricoReceitasDespesas().subscribe({
        next: (res) => {
          this.gastosMensais = res;
          this.loadItens++;
          this.verificarSeTodosOsItensCarregados();
        },
        error: (error) => {
          this.handleError(error);
        }
      })
    );
  }

  private verificarSeTodosOsItensCarregados() {
    if (this.loadItens === 3) {
      this.loaded();
    }
  }

}