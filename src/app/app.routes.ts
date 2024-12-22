import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';  // Path to your Sign Up component
import { LoginComponent } from './login/login.component';      // Path to your Login component

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' }  // Default to signup page
];
