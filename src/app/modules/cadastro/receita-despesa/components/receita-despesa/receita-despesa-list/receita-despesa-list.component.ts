import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseListComponent } from '../../../../../../core/base/base-list.component';
import { TransacaoFinanceiraDTO } from '../../../../../../shared/models/transacao-financeira-dto';
import { TransacaoFinanceiraService } from '../../../services/transacao-financeira.service';
import { EventSharedService } from '../../../../../../shared/services/event-shared.service';
import { TipoTransacaoFinanceiraPipe } from '../../../../../../shared/pipes/tipo-transacao-financeira.pipe';
import { MoedaPipe } from '../../../../../../shared/pipes/moeda.pipe';
import { PaginationComponent } from '../../../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-receita-despesa-list',
  imports: [CommonModule, RouterModule, NgxPaginationModule, PaginationComponent, TooltipModule,  TipoTransacaoFinanceiraPipe, MoedaPipe],
  templateUrl: './receita-despesa-list.component.html',
  styleUrl: './receita-despesa-list.component.scss'
})
export class ReceitaDespesaListComponent extends BaseListComponent<TransacaoFinanceiraDTO> implements OnDestroy {

  componenteAtivo = false;

  constructor(
    private transacaoFinanceiraService: TransacaoFinanceiraService,
  ) {
    super()
  }

  ngOnDestroy(): void {
    this.componenteAtivo = false;
  }

  ngOnInit(): void {
    this.componenteAtivo = true;
    this.initList();
    this.onChangePage();
  }

  initList() {
    this.loading();
    this.addSub(
      this.transacaoFinanceiraService.getListPaginate(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
        next: (res) => {
          this.entity = res.data;
          this.pagination.currentPage = res.page;
          this.pagination.itemsPerPage = res.pageSize;
          this.pagination.totalItems = res.total;
          this.loaded();
        },
        error: (error) => {
          this.handleError(error);
        }
      })
    )
  }

  onChangePage() {
    this.addSub(
      EventSharedService.get('loadList').subscribe((page: number) => {
        if (this.componenteAtivo) {
          this.pagination.currentPage = page;
          this.initList();
        }
      })
    )
  }

}
