import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { BaseComponent } from '../../../../core/base/base.component';

@Component({
  selector: 'app-classificavel',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingModule],
  templateUrl: './classificavel.component.html',
  styleUrl: './classificavel.component.scss'
})
export class ClassificavelComponent extends BaseComponent implements OnInit {

  x = 5;
  y = 2

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.loaded();
  }

}