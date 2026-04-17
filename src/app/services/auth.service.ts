import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8087/auth/signup'; // backend URL

  constructor(private http: HttpClient) {}

  register(data: Signup) {
    return this.http.post(`${this.baseUrl}`, data, { responseType: 'text' });
  }
}