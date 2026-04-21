import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-list.component.html'
})
export class BusListComponent implements OnInit {

  buses: any[] = [];

  source = '';
  destination = '';
  travelDate = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.source = params['source'];
      this.destination = params['destination'];
      this.travelDate = params['date'];

      this.loadBuses();

    });

  }

  loadBuses() {

    const url =
      `http://localhost:8087/schedule/search?source=${this.source}&destination=${this.destination}&date=${this.travelDate}`;

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.buses = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  bookNow(bus: any) {

    this.router.navigate(
      ['/seat-selection'],
      {
        state: {
          bus: bus,
          source: this.source,
          destination: this.destination,
          date: this.travelDate
        }
      }
    );

  }

}
