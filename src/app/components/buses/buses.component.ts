import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ✅ add Router
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {

  schedules: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      const source = params['source'];
      const destination = params['destination'];
      const date = params['date'];

      if (source && destination && date) {
        this.getSchedulesBySearch(source, destination, date);
      } else {
        console.log("Missing params");
      }

    });
  }

  // ✅ BOOK FUNCTION (NOW WORKS)
  bookNow(schedule: any) {
    console.log("Selected Schedule:", schedule);

    this.router.navigate(['/seat-selection'], {
      state: {
        schedule: schedule
      }
    });
  }

  // ✅ API CALL
  getSchedulesBySearch(source: string, destination: string, date: string) {

    const token = localStorage.getItem('token');

    this.http.get<any[]>(
      `http://localhost:8087/schedule/search?source=${source}&destination=${destination}&date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: (res) => {
        console.log("RESULT:", res);
        this.schedules = res;
      },
      error: (err) => {
        console.error("API ERROR:", err);
      }
    });
  }
}
