import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8087';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse) {

    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('token');
      alert('Session expired. Please login again.');
      this.router.navigate(['/login']);
    }

    return throwError(() => error);
  }

  getMyBookings(): Observable<Booking[]> {

    return this.http.get<Booking[]>(
      `${this.baseUrl}/my-bookings`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  createBooking(data: any): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/booking`,
      data,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }

}
