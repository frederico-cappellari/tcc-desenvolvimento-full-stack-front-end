import { Pagination } from '../../shared/models/pagination.model';
import { BaseComponent } from './base.component';

export abstract class BaseListComponent<T> extends BaseComponent {
  entity: T[] = [];
  pagination: Pagination = { itemsPerPage: 15, currentPage: 1, totalItems: 0, maxSize: 5 };
}
