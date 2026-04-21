// bookings.component.ts

import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  imports: [CommonModule]
})
export class BookingsComponent implements OnInit {

  bookings: Booking[] = [];

  loading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {

    this.bookingService.getMyBookings().subscribe({

      next: (res) => {
        console.log('DATA:', res);
        this.bookings = res;
        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        this.loading = false;
      }

    });

  }

}
