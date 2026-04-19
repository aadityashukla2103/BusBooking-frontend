import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private api = 'http://localhost:8087/bookings';

  constructor(private http: HttpClient) {}

  getMyBookings() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Booking[]>(this.api, { headers });
  }
}