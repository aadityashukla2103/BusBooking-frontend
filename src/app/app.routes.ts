import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { RoutesComponent } from './pages/routes/routes.component';

import { BusesComponent } from './components/buses/buses.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component';
import { BookingSuccessComponent } from './components/booking-success/booking-success.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'profile', component: ProfileComponent },
  { path: 'bookings', component: BookingsComponent },

  { path: 'routes', component: RoutesComponent },

  { path: 'buses', component: BusesComponent },
  { path: 'bus-list', component: BusListComponent },

  { path: 'seat-selection', component: SeatSelectionComponent },

  { path: 'passenger-details', component: PassengerDetailsComponent },

  { path: 'booking-success', component: BookingSuccessComponent },

  { path: '**', redirectTo: '' }

];
