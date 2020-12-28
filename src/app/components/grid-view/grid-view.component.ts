import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService, GetPicturesPageResponse, GridItem } from 'src/app/services/data.service';
import { ImageViewComponent, ImageViewDialogData } from '../image-view/image-view.component';
import { PaginationState } from './pagination/pagination.state';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

  public items: GridItem[] = [];
  public pagingState: PaginationState = new PaginationState(1, 1);

  constructor(
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPicturesPage();
  }

  private getPicturesPage(params?: string) {
    this.dataService
      .getPicturesPage(params)
      .subscribe((data: GetPicturesPageResponse) => {
        this.items = data.pictures;
        this.pagingState = new PaginationState(this.pagingState.currentPage, data.pageCount);
      });
  }

  public handlePageChange() {
    const params: string = `page=${this.pagingState.currentPage}`;
    this.getPicturesPage(params);
  }

  public onItemClick(id: string) {
      this.dialog.open(ImageViewComponent, {
        height: '100%',
        width: '100%',
        data: <ImageViewDialogData>{
          imageIds: this.items.map(item => item.id),
          currentId: id
        }
      });
  }

}
