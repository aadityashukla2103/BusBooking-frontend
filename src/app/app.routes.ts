import { Routes } from '@angular/router';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { BusesComponent } from './components/buses/buses.component';
import { RoutesComponent } from './pages/routes/routes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'bookings', component: BookingsComponent},
  { path: 'buses', component: BusesComponent },
  { path: 'routes', component: RoutesComponent }
    
];
