import { Component, OnInit, ViewChild } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ListaComprasFormComponent } from './lista-compras-form/lista-compras-form.component';
import { ListaComprasListComponent } from './lista-compras-list/lista-compras-list.component';
import { BaseComponent } from '../../../../core/base/base.component';

@Component({
  selector: 'app-lista-compras',
  imports: [ListaComprasFormComponent, ListaComprasListComponent, AccordionModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.scss'
})
export class ListaComprasComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  @ViewChild(ListaComprasListComponent) listaComponent!: ListaComprasListComponent;

  onRegistroIncluido() {
    this.listaComponent.ngOnInit();
  }

}
