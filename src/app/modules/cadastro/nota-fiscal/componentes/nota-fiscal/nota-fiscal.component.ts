import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../../core/base/base.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NotaFiscalFormComponent } from './nota-fiscal-form/nota-fiscal-form.component';
import { NotaFiscalListComponent } from './nota-fiscal-list/nota-fiscal-list.component';

@Component({
  selector: 'app-nota-fiscal',
  imports: [NotaFiscalFormComponent, NotaFiscalListComponent, AccordionModule],
  templateUrl: './nota-fiscal.component.html',
  styleUrl: './nota-fiscal.component.scss'
})
export class NotaFiscalComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  @ViewChild(NotaFiscalListComponent) listaComponent!: NotaFiscalListComponent;

  onRegistroIncluido() {
    this.listaComponent.ngOnInit();
  }

}
