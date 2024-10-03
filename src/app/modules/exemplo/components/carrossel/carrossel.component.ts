import { Component, OnInit } from '@angular/core';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
import { BaseComponent } from '../../../../core/base/base.component';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [CarouselModule],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 4000, noPause: true, showIndicators: true } }
  ],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.scss'
})
export class CarrosselComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.loaded();
  }

}
