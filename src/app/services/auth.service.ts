import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) {}

  // ✅ Signup
  register(data: Signup) {
    return this.http.post(`${this.baseUrl}/auth/signup`, data, { responseType: 'text' });
  }

  // ✅ Login
  login(data: any) {
    return this.http.post(
      `${this.baseUrl}/generateToken`,
      data,
      { responseType: 'text' }
    );
  }
  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
getProfile() {
  const token = localStorage.getItem('token');

  return this.http.get<any>('http://localhost:8087/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}