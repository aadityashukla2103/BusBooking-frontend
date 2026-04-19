import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BusesComponent } from './components/buses/buses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,HomeComponent,SignupComponent,LoginComponent,
    FooterComponent,ProfileComponent,BusesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'busbooking';
}
