import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  routes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getRoutes();
  }

  // 🔥 GET ALL ROUTES
  getRoutes() {
    const token = localStorage.getItem('token');

    this.http.get<any[]>('http://localhost:8087/route', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res) => {
        console.log("ROUTES:", res);
        this.routes = res;
      },
      error: (err) => {
        console.error("API ERROR:", err);
      }
    });
  }

  viewBuses(route: any) {
    const today = new Date().toISOString().split('T')[0];

    this.router.navigate(['/bus-list'], {
      queryParams: {
        source: route.source,
        destination: route.destination,
        date: today
      }
    });
  }
}
