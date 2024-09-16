import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseListComponent } from '../../../../core/base/base-list.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Country } from '../../models/example.model';
import { ExampleService } from '../../services/example.service';

@Component({
  selector: 'app-example-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe, NgxPaginationModule, PaginationComponent, TooltipModule],
  providers: [ExampleService],
  templateUrl: './example-list.component.html',
  styleUrl: './example-list.component.scss',
})

export class ExampleListComponent extends BaseListComponent<Country> implements OnInit {

  constructor(
    private exampleService: ExampleService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.initList();
  }

  initList() {
    this.loading();
    this.entity = this.exampleService.getCountry();
    this.loaded();
  }

  confirmDelete(id: number) {
    this.alertConfirmation().subscribe((confirmed) => {
      if (confirmed) {
        this.excluir(id);
      }
    });
  }

  excluir(id: number) {
    this.loading();
    this.exampleService.delete(id).subscribe({
      next: () => {
        this.confirmation('Deletado com sucesso').subscribe(() => {
          this.initList();
        });
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

}

