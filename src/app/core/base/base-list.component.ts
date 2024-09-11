import { BaseComponent } from './base.component';

export abstract class BaseListComponent<T> extends BaseComponent {
  entity: T[] = [];
  pagination: any = { itemsPerPage: 15, currentPage: 1, totalItems: 0, maxSize: 5 };
}
