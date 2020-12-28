import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public get<T>(url: string, options?: object): Observable<T> {
    return this.http.get<T>(url, { observe: 'body', ...options });
  }

  public post<T>(url: string, body: any, options?: object): Observable<T> {
    return this.http.post<T>(url, body, { observe: 'body', ...options });
  }

}
