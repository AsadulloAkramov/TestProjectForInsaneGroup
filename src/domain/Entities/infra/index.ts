export interface PaginationListDTO<T> {
  total: number;
  totalPages: number;
  page: number;
  nextPage: number;
  prevPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  items: T | T[];
  limit: number;
  offset: number;
}

export interface PaginateOptions {
  offset: number;
  limit?: number;
}
