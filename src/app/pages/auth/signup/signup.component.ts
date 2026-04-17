import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup',
  imports: [FormsModule],
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

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.formData).subscribe({
      next: (res) => {
        alert(res); // "User Registered Successfully"
      },
      error: (err) => {
        console.log(err);
        alert('Error occurred');
      }
    });
  }
}