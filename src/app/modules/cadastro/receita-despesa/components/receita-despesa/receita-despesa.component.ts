import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../../core/base/base.component';
import { ReceitaDespesaFormComponent } from './receita-despesa-form/receita-despesa-form.component';
import { ReceitaDespesaListComponent } from './receita-despesa-list/receita-despesa-list.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@Component({
  selector: 'app-receita-despesa',
  imports: [ReceitaDespesaFormComponent, ReceitaDespesaListComponent, AccordionModule],
  templateUrl: './receita-despesa.component.html',
  styleUrl: './receita-despesa.component.scss'
})
export class ReceitaDespesaComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  @ViewChild(ReceitaDespesaListComponent) listaComponent!: ReceitaDespesaListComponent;

  onRegistroIncluido() {
    this.listaComponent.ngOnInit();
  }

}
