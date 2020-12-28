import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService : ApiService
  ) { }

  private _token: string;
  public get token() {
    return this._token;
  }

  public async initToken() {
    const storedToken = localStorage.getItem(AppConstants.LOCAL_STORAGE_TOKEN_KEY);
    if (storedToken) {
      this._token = storedToken;
      return;
    }

    const url = `${AppConstants.API_ENDPOINT}/${AppConstants.AUTH}`;
    const data = { "apiKey": AppConstants.API_KEY };
    const result = await this.apiService.post<LoginResult>(url, data).toPromise();
    this._token = result.token;
    localStorage.setItem(AppConstants.LOCAL_STORAGE_TOKEN_KEY, result.token);
  }

  public refreshToken() {
    localStorage.removeItem(AppConstants.LOCAL_STORAGE_TOKEN_KEY);
    return this.initToken();
  }

}

export interface LoginResult {
  auth: boolean,
  token: string
}
