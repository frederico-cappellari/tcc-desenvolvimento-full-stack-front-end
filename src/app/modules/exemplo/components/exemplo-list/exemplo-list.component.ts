import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseListComponent } from '../../../../core/base/base-list.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Exemplo } from '../../models/exemplo.model';
import { ExemploService } from '../../services/exemplo.service';
import { ExemploPipe } from '../../../../shared/pipes/exemplo.pipe';

@Component({
  selector: 'app-exemplo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe, NgxPaginationModule, PaginationComponent, TooltipModule, ExemploPipe],
  providers: [ExemploService],
  templateUrl: './exemplo-list.component.html',
  styleUrl: './exemplo-list.component.scss',
})

export class ExemploListComponent extends BaseListComponent<Exemplo> implements OnInit {

  constructor(
    private exemploService: ExemploService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.initList();
  }

  initList() {
    this.loading();
    this.entity = this.exemploService.getExemplo();
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
    this.exemploService.delete(id).subscribe({
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