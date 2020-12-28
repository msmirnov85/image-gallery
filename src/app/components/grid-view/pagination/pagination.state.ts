export class PaginationState {

  constructor(currentPage: number, pageCount: number) {
    this.pageCount = pageCount;
    this.currentPage = currentPage;
  }

  pageCount: number;
  currentPage: number;

  public static createEmpty(): PaginationState {
    return new PaginationState(0, 0);
  }

}
