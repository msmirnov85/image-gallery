import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private apiService: ApiService
  ) { }

  public getPicturesPage(params?: string) {
    let url = `${AppConstants.API_ENDPOINT}/${AppConstants.IMAGES}`;
    if (params)
      url = `${url}?${params}`;

    return this.apiService.get<GetPicturesPageResponse>(url);
  }

  public getPictureById(id: string) {
    let url = `${AppConstants.API_ENDPOINT}/${AppConstants.IMAGES}/${id}`;
    return this.apiService.get<GetPictureByIdResponse>(url);
  }

  public imageExists(src: string) {
    return new Promise<boolean>((resolve) => {
      let img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

}

export interface GetPicturesPageResponse {
  hasMore: boolean;
  page: number;
  pageCount: number;
  pictures: GridItem[];
}

export interface GetPictureByIdResponse {
  author: string;
  camera: string;
  cropped_picture: string;
  full_picture: string;
  id: string;
  tags: string;
}

export interface GridItem {
  cropped_picture: string;
  id: string;
}
