import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { Pagination } from '../../models/pagination.model';
import { BaseComponent } from '../../../core/base/base.component';
import { EventSharedService } from '../../services/event-shared.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent extends BaseComponent {
  @Input() pagination: Pagination = { itemsPerPage: 0, currentPage: 0, totalItems: 0, maxSize: 0 };
  @Input() totalItems = 0;

  pageChanged(event: PageChangedEvent): void {
    EventSharedService.get('loadList').emit(event?.page);
  }
}
