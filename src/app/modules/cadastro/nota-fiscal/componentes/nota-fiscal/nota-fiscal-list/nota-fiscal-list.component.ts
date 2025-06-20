import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseListComponent } from '../../../../../../core/base/base-list.component';
import { PaginationComponent } from '../../../../../../shared/components/pagination/pagination.component';
import { MoedaPipe } from '../../../../../../shared/pipes/moeda.pipe';
import { SimNaoPipe } from '../../../../../../shared/pipes/sim-nao.pipe';
import { SituacaoNotaFiscalPipe } from '../../../../../../shared/pipes/situacao-nota-fiscal.pipe';
import { EventSharedService } from '../../../../../../shared/services/event-shared.service';
import { NotaFiscalDTO } from '../../../models/nota-fiscal-dto';
import { NotaFiscalService } from '../../../services/nota-fiscal.service';

@Component({
  selector: 'app-nota-fiscal-list',
  imports: [CommonModule, RouterModule, NgxPaginationModule, PaginationComponent, TooltipModule, MoedaPipe, SituacaoNotaFiscalPipe, SimNaoPipe],
  templateUrl: './nota-fiscal-list.component.html',
  styleUrl: './nota-fiscal-list.component.scss'
})
export class NotaFiscalListComponent extends BaseListComponent<NotaFiscalDTO> implements OnDestroy {

  componenteAtivo = false;

  constructor(
    private notaFiscalService: NotaFiscalService,
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
      this.notaFiscalService.getListPaginate(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
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
