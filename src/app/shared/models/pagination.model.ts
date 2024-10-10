export interface Pagination {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  maxSize: number;
}
export interface PaginationRequest {
  ascending: boolean;
  data: any[];
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}