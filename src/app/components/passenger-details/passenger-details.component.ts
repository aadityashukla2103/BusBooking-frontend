import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-passenger-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {

  source = '';
  destination = '';
  travelDate = '';

  selectedBus: any = {};
  selectedSeats: number[] = [];

  passengers: any[] = [];

  loading = false;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const data = history.state;

    this.selectedBus = data.bus || {};
    this.source = data.source || '';
    this.destination = data.destination || '';
    this.travelDate = data.date || '';
    this.selectedSeats = data.seats || [];

    this.passengers = this.selectedSeats.map((seat: number) => ({
      seatNo: seat,
      name: '',
      age: '',
      gender: ''
    }));
  }

  confirmBooking() {

    const payload = {
      scheduleId: this.selectedBus.id,
      passengers: this.passengers
    };

    this.loading = true;

    this.bookingService.createBooking(payload)
      .subscribe({
        next: (res) => {

          this.loading = false;

          alert('Booking Confirmed ✅');

          this.router.navigate(['/bookings']);
        },

        error: (err) => {

          this.loading = false;

          alert('Booking Failed ❌');

          console.log(err);
        }
      });
  }

}
