import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BaseComponent } from '../../../../core/base/base.component';
import { AcordeaoComponent } from '../acordeao/acordeao.component';
import { BarraProgressoComponent } from '../barra-progresso/barra-progresso.component';
import { ClassificavelComponent } from '../classificavel/classificavel.component';

@Component({
  selector: 'app-abas',
  imports: [CommonModule, TabsModule, AcordeaoComponent, BarraProgressoComponent, ClassificavelComponent],
  templateUrl: './abas.component.html',
  styleUrl: './abas.component.scss'
})
export class AbasComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.loaded();
  }
}
