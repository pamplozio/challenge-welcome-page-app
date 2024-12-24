import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';  // Path to your Sign Up component
import { LoginComponent } from './login/login.component';   // Path to your Login component
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }  // Default to signup page
];
