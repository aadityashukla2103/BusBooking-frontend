import { Component,OnInit } from '@angular/core';
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
export class HomeComponent  implements OnInit{

  from: string = '';
  to: string = '';
  date: string = '';
todayDate: string = '';

ngOnInit() {
  const today = new Date();
  this.todayDate = today.toISOString().split('T')[0];
}

  constructor(private router: Router) {}

  swapCities() {
    const temp = this.from;
    this.from = this.to;
    this.to = temp;
  }

search() {

  if (!this.from || !this.to || !this.date) {
    alert("Please fill all fields");
    return;
  }

  if (this.date < this.todayDate) {
    alert("Previous date is not allowed");
    return;
  }

  this.router.navigate(['/bus-list'], {
    queryParams: {
      source: this.from,
      destination: this.to,
      date: this.date
    }
  });
}
}
