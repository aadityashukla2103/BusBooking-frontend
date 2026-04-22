import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { ToastrService } from 'ngx-toastr';

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
  submitted = false;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private toastr: ToastrService
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

  // Name validation
  isValidName(name: string): boolean {
    return /^[A-Za-z ]+$/.test(name.trim());
  }

  // Age validation
  isValidAge(age: any): boolean {
    return Number.isInteger(Number(age)) && Number(age) > 0;
  }

  // Full form validation
  validatePassengers(): boolean {

    return this.passengers.every(p =>
      p.name &&
      p.name.trim() !== '' &&
      this.isValidName(p.name) &&
      p.age !== '' &&
      this.isValidAge(p.age) &&
      p.gender &&
      p.gender.trim() !== ''
    );
  }

  confirmBooking() {

    this.submitted = true;

    if (!this.validatePassengers()) {

      this.toastr.warning(
        'Please fill all passenger details correctly',
        'Validation Error'
      );

      return;
    }

    const payload = {
      scheduleId: this.selectedBus.id,
      passengers: this.passengers.map(p => ({
        seatNo: p.seatNo,
        name: p.name.trim(),
        age: Number(p.age),
        gender: p.gender
      }))
    };

    this.loading = true;

    this.bookingService.createBooking(payload)
      .subscribe({
        next: (res) => {

          this.loading = false;

          const seats = this.selectedSeats.join(',');

          this.toastr.success(
            `Seats ${seats} booked successfully`,
            'Success',
            {
              timeOut: 3000,
              progressBar: true,
              closeButton: true
            }
          );

          this.router.navigate(['/bookings']);
        },

        error: (err) => {

          this.loading = false;

          this.toastr.error(
            'Booking Failed ❌',
            'Error',
            {
              timeOut: 3000,
              progressBar: true,
              closeButton: true
            }
          );

          console.log(err);
        }
      });
  }

}
