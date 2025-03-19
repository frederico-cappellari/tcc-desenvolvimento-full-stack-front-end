import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { BaseComponent } from '../../../../core/base/base.component';

interface IItemObject {
  id: number;
  name: string;
}

@Component({
  selector: 'app-arrasta-solta',
  imports: [CommonModule, FormsModule, SortableModule],
  templateUrl: './arrasta-solta.component.html',
  styleUrl: './arrasta-solta.component.scss'
})
export class ArrastaSoltaComponent extends BaseComponent implements OnInit {
  itemEsquerda: IItemObject[] = [
    { id: 1, name: 'Primeiro' },
    { id: 2, name: 'Segundo' },
    { id: 3, name: 'Terceiro' }
  ];

  itemDireita: IItemObject[] = [
    { id: 4, name: 'Quarto' },
    { id: 5, name: 'Quinto' },
    { id: 6, name: 'Sexto' }
  ];

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.loaded();
  }
}