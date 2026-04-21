import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {

  source = '';
  destination = '';
  travelDate = '';

  selectedBus: any = {};

  seats: any[] = [];
  selectedSeatNumbers: number[] = [];

  fare = 500;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    const data = history.state;

    this.selectedBus = data.bus || {};
    this.source = data.source || '';
    this.destination = data.destination || '';
    this.travelDate = data.date || '';

    this.loadSeats();
  }

  loadSeats() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(
      `http://localhost:8087/seats/${this.selectedBus.id}`,
      { headers }
    ).subscribe({

      next: (res) => {
        this.generateSeats(res.totalSeats, res.bookedSeats);
      },

      error: (err) => {
        console.log(err);
      }

    });
  }

  generateSeats(total: number, bookedSeats: number[]) {

    this.seats = [];

    for (let i = 1; i <= total; i++) {

      this.seats.push({
        number: i,
        booked: bookedSeats.includes(i),
        selected: false
      });

    }
  }

  toggleSeat(seat: any) {

    if (seat.booked) return;

    seat.selected = !seat.selected;

    this.selectedSeatNumbers = this.seats
      .filter(x => x.selected)
      .map(x => x.number);
  }

  continueBooking() {

    this.router.navigate(['/passenger-details'], {
      state: {
        bus: this.selectedBus,
        source: this.source,
        destination: this.destination,
        date: this.travelDate,
        seats: this.selectedSeatNumbers
      }
    });

  }

}
