import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BaseComponent } from '../../../../core/base/base.component';

@Component({
  selector: 'app-acordeao',
  standalone: true,
  imports: [AccordionModule],
  templateUrl: './acordeao.component.html',
  styleUrl: './acordeao.component.scss'
})
export class AcordeaoComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.loaded();
  }

}
