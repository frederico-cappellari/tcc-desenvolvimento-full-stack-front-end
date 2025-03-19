import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { BaseComponent } from '../../../../core/base/base.component';

@Component({
  selector: 'app-grafico',
  imports: [BaseChartDirective],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class GraficoComponent extends BaseComponent implements OnInit {

  lineChart = {
    data: {
      labels: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho'
      ],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          label: 'Series A',
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
    legend: true,
  }

  barChart = {
    data: {
      labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      datasets: [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
      ]
    },
    plugins: [],
    options: {
      responsive: false
    },
    legend: true,
  }

  pieChart = {
    labels: ['Download', 'Vendas', 'Estoque'],
    datasets: [{
      data: [300, 500, 100]
    }],
    plugins: [],
    options: {
      responsive: false
    },
    legend: true,
  }

  doughnutChart = {
    labels: ['Download', 'Vendas', 'Estoque'],
    datasets: [
      { data: [350, 450, 100], label: 'Series A' },
      { data: [50, 150, 120], label: 'Series B' },
      { data: [250, 130, 70], label: 'Series C' }
    ],
    plugins: [],
    options: {
      responsive: false
    },
    legend: true,
  }

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.loaded();
  }
}
