import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Import the service
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';  // Import Router for navigation
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FontAwesomeModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; // Initial error message is null
  successMessage: string | null = null; 

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,  // Inject Router service to handle navigation
    private matIconRegistry: MatIconRegistry,  // Inject MatIconRegistry
    private domSanitizer: DomSanitizer // Inject DomSanitizer for icon URLs
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Register icons (if required)
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('icons/google.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('icons/facebook.svg')
    );
  }

  onSubmit(): void {
    // Only check for invalid credentials AFTER login is attempted
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      // Reset the error and success messages at the start of login attempt
      this.errorMessage = null;
      this.successMessage = null;
  
      // Login attempt
      this.authService.login(email, password).subscribe(
        (response) => {
          // Successful login
          console.log('Login successful', response);
          this.successMessage = 'Login successful!';
  
          // Reset the form after login
          this.loginForm.reset();
          this.clearFormControls();
  
          // Clear the success message after a timeout
          setTimeout(() => {
            this.successMessage = null;
          }, 6000); // Success message disappears after 6 seconds
        },
        (error) => {
          // Handle failure (e.g., invalid credentials)
          console.error('Login failed', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid login credentials'; // Show error message
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
  
          // Reset the form after failed login
          this.loginForm.reset();
          this.clearFormControls();
  
          // Optional: Clear error message after some time
          setTimeout(() => {
            this.errorMessage = null;
          }, 6000); // Error message disappears after 6 seconds
        }
      );
    }
  }

  // Helper function to clear form control state
  private clearFormControls(): void {
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      const control = this.loginForm.get(controlName);
      if (control) {
        control.markAsPristine(); // Prevent form errors showing
        control.markAsUntouched();
        control.setErrors(null); // Clear previous errors
      }
    });
  }

  // Navigate to Sign Up page
  goToSignup() {
    this.router.navigate(['/signup']);
  }

  // Navigate to Home page
  goToHome() {
    this.router.navigate(['/']);
  }
}