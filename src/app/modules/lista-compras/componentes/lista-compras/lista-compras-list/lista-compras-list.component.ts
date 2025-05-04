import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { BaseListComponent } from '../../../../../core/base/base-list.component';
import { ItemCompraDTO } from '../../../../../shared/models/item-compra-dto';
import { MoedaPipe } from '../../../../../shared/pipes/moeda.pipe';
import { ListaComprasService } from '../../../services/lista-compras.service';
import { EventSharedService } from '../../../../../shared/services/event-shared.service';

@Component({
  selector: 'app-lista-compras-list',
  imports: [CommonModule, RouterModule, NgxPaginationModule, PaginationComponent, TooltipModule, MoedaPipe],
  templateUrl: './lista-compras-list.component.html',
  styleUrl: './lista-compras-list.component.scss'
})
export class ListaComprasListComponent extends BaseListComponent<ItemCompraDTO> {

  constructor(
    private listaComprasService: ListaComprasService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.initList();
    this.onChangePage();
  }

  initList() {
    this.loading();
    this.addSub(
      this.listaComprasService.getListPaginate(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
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
        this.pagination.currentPage = page;
        this.initList()
      })
    )
  }

}
