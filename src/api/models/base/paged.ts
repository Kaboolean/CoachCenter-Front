export interface PagedList<T> {
  totalItems: number;
  skipToken: string | null;
  pageCount: number;
  hasNextPage: boolean;
  value: T[];
}

export interface PagedResult<T> {
  totalCount: number;
  value: T[];
  pageCount: number;
}

export class QueryParameters {
  public search: string | null;
  public expand: string | null;
  public page: number;
  public perPage: number;
  public sortBy: string | null;
  public descending: boolean;

  constructor() {
    this.search = null;
    this.expand = null;
    this.page = 1;
    this.perPage = 10;
    this.sortBy = null;
    this.descending = false;
  }
}
