import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  templateUrl: './bookings.component.html',
  imports: [RouterLink,CommonModule]
})
export class BookingsComponent implements OnInit {

  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (res) => {
        console.log("DATA:", res);
        this.bookings = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}