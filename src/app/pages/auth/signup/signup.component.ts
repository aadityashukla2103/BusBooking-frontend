import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';   // ✅ ADD
import { Router, RouterLink } from '@angular/router';     // ✅ ADD
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule,CommonModule],  // ✅ ADD
  standalone: true,
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  formData = {
    username: '',
    password: '',
    name: '',
    phone: ''
  };

  // ✅ CONSTRUCTOR → ADD HERE
  constructor(
    private authService:AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.formData.username || !this.formData.password ||
        !this.formData.name || !this.formData.phone) {
      this.toastr.warning('Please fill all fields ⚠️');
      return;
    }

    this.authService.register(this.formData).subscribe({
      next: (res) => {
        if (res === 'Username already exists') {
          this.toastr.error('Username already taken ❌');
        } else {
          this.toastr.success('Account created successfully 🎉');
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.toastr.error('Something went wrong ❌');
      }
    });
  }
}