import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseURL;
  constructor(private http: HttpClient) {
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }
  getAllUsers() {
    return this.http.get(`${this.baseURL + 'users'}`);
  }
}
