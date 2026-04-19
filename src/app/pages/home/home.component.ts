import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  from: string = '';
  to: string = '';
  date: string = '';

  constructor(private router: Router) {}

  // 🔁 Swap cities
  swapCities() {
    const temp = this.from;
    this.from = this.to;
    this.to = temp;
  }

  // 🔍 Search (FINAL)
  search() {
    console.log("FROM:", this.from);
    console.log("TO:", this.to);
    console.log("DATE:", this.date);

    if (!this.from || !this.to || !this.date) {
      alert("Please fill all fields");
      return;
    }

    this.router.navigate(['/buses'], {
      queryParams: {
        source: this.from,
        destination: this.to,
        date: this.date
      }
    });
  }
}