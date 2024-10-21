import { Component, OnInit } from '@angular/core';
import { ProgressbarModule, ProgressbarType } from 'ngx-bootstrap/progressbar';
import { BaseComponent } from '../../../../core/base/base.component';

interface IStack {
  type: ProgressbarType;
  label: string;
  value: number;
  max: number;
}

@Component({
  selector: 'app-barra-progresso',
  standalone: true,
  imports: [ProgressbarModule],
  templateUrl: './barra-progresso.component.html',
  styleUrl: './barra-progresso.component.scss'
})

export class BarraProgressoComponent extends BaseComponent implements OnInit {

  type?: string;
  stacked: IStack[] = [];

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.randomStacked();
    this.loaded();
  }

  randomStacked(): void {
    const types = ['success', 'info', 'warning', 'danger'];

    this.stacked = [];
    const n = Math.floor(Math.random() * 4 + 1);
    for (let i = 0; i < n; i++) {
      const index = Math.floor(Math.random() * 4);
      const value = Math.floor(Math.random() * 27 + 3);
      this.stacked.push({
        value,
        type: types[index],
        label: value + ' %'
      } as IStack);
    }
  }
}
