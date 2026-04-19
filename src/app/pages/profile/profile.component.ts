import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
  this.authService.getProfile().subscribe({
    next: (res) => {
      console.log("PROFILE DATA:", res);   // 🔥 IMPORTANT
      this.user = res;
    },
    error: (err) => {
      console.log("ERROR:", err);
    }
  });
}
}