import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConstants } from '../app.constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService : ApiService
  ) { }

  public onAuthenticated: Subject<any> = new Subject<any>();
  private _token: string = '';
  public get token() {
    return this._token;
  }

  public login() {
    const storedToken: string | null = localStorage.getItem(AppConstants.LOCAL_STORAGE_TOKEN_KEY);
    if (storedToken) {
      this._token = storedToken;
      return;
    }

    const url = `${AppConstants.API_ENDPOINT}/${AppConstants.AUTH}`;
    const data = { "apiKey": AppConstants.API_KEY };

    this.apiService
      .post<LoginResponse>(url, data)
      .subscribe((result: LoginResponse) => this.onLoggedIn(result));
  }

  public refreshToken() {
    localStorage.removeItem(AppConstants.LOCAL_STORAGE_TOKEN_KEY);
    this.login();
  }

  private onLoggedIn(data: LoginResponse) {
    this._token = data.token;
    localStorage.setItem(AppConstants.LOCAL_STORAGE_TOKEN_KEY, data.token);
    this.onAuthenticated.next();
  }

}

export interface LoginResponse {
  auth: boolean,
  token: string
}
