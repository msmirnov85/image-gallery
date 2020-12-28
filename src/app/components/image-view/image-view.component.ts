import { Component, Inject, OnInit } from '@angular/core';
import { DataService, GetPictureByIdResponse } from 'src/app/services/data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  public isImageLoaded: boolean = false;
  public currentPicture: GetPictureByIdResponse;
  public isFullScreenMode: boolean = false;
  private windowParams: string[] = [``, `width=500, height=500, scrollbars=yes, resizable=no`];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImageViewDialogData,
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.loadImage(this.data.currentId);
  }

  public get backgroundImage(): string {
    return `url(${encodeURI(this.currentPicture.full_picture)})`;
  }

  public close() {
    this.dialog.closeAll();
  }

  private async loadImage(id: string) {
    this.isImageLoaded = false;
    this.dataService
      .getPictureById(id)
      .subscribe(async (currentPicture: GetPictureByIdResponse) => {
        this.currentPicture = currentPicture;
        this.isImageLoaded = await this.dataService.imageExists(this.currentPicture.full_picture);
      });
  }

  public previous() {
    this.toggleImage(Direction.Previous);
  }

  public next() {
    this.toggleImage(Direction.Next);
  }

  public toggleImage(direction: Direction) {
    const currentIndex = this.data.imageIds.indexOf(this.currentPicture.id);
    const targetIndex = direction === Direction.Previous ? currentIndex - 1 : currentIndex + 1;
    const targetImageId = this.data.imageIds[targetIndex];
    this.loadImage(targetImageId);
  }

  public toggleFullScreen() {
    this.isFullScreenMode = !this.isFullScreenMode;
  }

  public get isPreviousButtonDisabled() {
    return this.data.imageIds.indexOf(this.currentPicture.id) === 0;
  }

  public get isNextButtonDisabled() {
    return this.data.imageIds.indexOf(this.currentPicture.id) === this.data.imageIds.length - 1;
  }

  public shareFacebookUrl() {
    window.open(`http://www.facebook.com/sharer.php?u=${this.currentPicture.full_picture}`, ...this.windowParams);
    return false;
  }

  public shareTweetUrl() {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(this.currentPicture.full_picture)}&text=${this.currentPicture.author}`, ...this.windowParams);
    return false;
  }

  public shareMailUrl() {
    window.open(`mailto:?subject=${encodeURIComponent(this.currentPicture.author)}&body=${encodeURIComponent(this.currentPicture.full_picture)}`);
    return false;
  }

  public shareLinkedinUrl() {
    window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(this.currentPicture.full_picture)}&title=${encodeURIComponent(this.currentPicture.author)}`, ...this.windowParams);
    return false;
  }

}

export interface ImageViewDialogData {
  imageIds: string[];
  currentId: string;
}

enum Direction {
  Previous,
  Next
}
