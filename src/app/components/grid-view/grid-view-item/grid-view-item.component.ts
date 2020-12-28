import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-grid-view-item',
  templateUrl: './grid-view-item.component.html',
  styleUrls: ['./grid-view-item.component.css']
})
export class GridViewItemComponent implements OnInit {

  @Input() public url: string;
  @Input() public id: string;
  @Output() public onItemClick: EventEmitter<string> = new EventEmitter<string>();
  public isImageLoaded: boolean = false;

  constructor(
    private dataService: DataService
  ) { }

  async ngOnInit() {
    this.isImageLoaded = await this.dataService.imageExists(this.url);
  }

  onClick() {
    this.onItemClick.emit(this.id);
  }

  public get backgroundImage(): string {
    return `url(${encodeURI(this.url)})`;
  }

}
