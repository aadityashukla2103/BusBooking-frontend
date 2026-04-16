import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { SignupComponent } from '../../pages/auth/signup/signup.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,LoginComponent,SignupComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
