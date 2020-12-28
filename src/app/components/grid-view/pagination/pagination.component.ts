import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationState } from './pagination.state';

@Component({
  selector: 'app-pagination',
  templateUrl: `./pagination.component.html`,
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Output() pageChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() set pagingState(value: PaginationState) {
    this._pagingState = value ? value : PaginationState.createEmpty();
    this.calculatePaging();
  };

  private _pagingState: PaginationState = PaginationState.createEmpty();
  public pageList: Array<number> = [];
  private selectedPage: number;
  public nextItemValid: boolean;
  public previousItemValid: boolean;
  public firstPageVisible: boolean;
  public lastPageVisible: boolean;
  public totalPagesCount: number;

  get pagingState(): PaginationState {
    return this._pagingState;
  }

  constructor() {
  }

  ngOnInit() {
    this.calculatePaging();
  }

  resetState() {
    this.pagingState.currentPage = 1;
    this.calculatePaging();
  }

  setCurrentPage(pageNo: number) {
    this.pagingState.currentPage = pageNo;
    this.calculatePaging();
    this.onPageChanged();
  }

  calculatePaging() {
    this.pageList = [];
    this.selectedPage = this.pagingState.currentPage;
    this.totalPagesCount = this.pagingState.pageCount;

    let sectionStart = Math.max(this.pagingState.currentPage - 3, 1);
    let sectionSize = Math.min(this.totalPagesCount - sectionStart + 1, 4);
    for (let i = sectionStart; i < sectionStart + sectionSize; i++) {
      this.pageList.push(i);
    }

    this.firstPageVisible = sectionStart === 1;
    this.lastPageVisible = this.pageList[sectionSize - 1] === this.totalPagesCount;

    if (this.selectedPage < this.totalPagesCount) {
      this.nextItemValid = true;
    } else {
      this.nextItemValid = false;
    }

    if (this.selectedPage > 1) {
      this.previousItemValid = true;
    } else {
      this.previousItemValid = false;
    }
  }

  public navigateToFirstPageIsPossible() {
    if (!this.previousItemValid) {
      return;
    }

    this.pagingState.currentPage = 1;
    this.calculatePaging();
    this.onPageChanged();
  }

  public navigateToLastPageIfPossible() {
    if (!this.nextItemValid) {
      return;
    }

    this.pagingState.currentPage = this.totalPagesCount;
    this.calculatePaging();
    this.onPageChanged();
  }

  public navigateToNextPageIfPossible() {
    if (!this.nextItemValid) {
      return;
    }

    this.pagingState.currentPage = this.pagingState.currentPage + 1;
    this.calculatePaging();
    this.onPageChanged();
  }

  public navigateToPreviousPageIsPossible() {
    if (!this.previousItemValid) {
      return;
    }
    this.pagingState.currentPage = this.pagingState.currentPage - 1;
    this.calculatePaging();
    this.onPageChanged();
  }

  public onPageChanged() {
    this.pageChanged.emit();
  }
}
