// booking-success.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit {

  booking: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {

    const data = history.state;

    this.booking = data.booking || {};
  }

  goToBookings() {
    this.router.navigate(['/bookings']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
