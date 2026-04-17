import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';     // ✅
import { CommonModule } from '@angular/common';   // ✅
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule], // ✅
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  };
  constructor(
  private authService: AuthService,
  private toastr: ToastrService,
  private router: Router
) {}
onLogin() {

  if (!this.loginData.username || !this.loginData.password) {
    this.toastr.warning('Please fill all fields ⚠️');
    return;
  }

  this.authService.login(this.loginData).subscribe({
    next: (res: string) => {

      // ✅ store JWT token
      localStorage.setItem('token', res);

      this.toastr.success('Login successful ✅');

      this.router.navigate(['/']); // go to home
    },
    error: () => {
      this.toastr.error('Invalid credentials ❌');
    }
  });
}

}