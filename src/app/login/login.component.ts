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
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; // Initialize as null, no message initially
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Reset error and success messages before the form submit
      this.errorMessage = null;
      this.successMessage = null;

      this.authService.login(email, password).subscribe(
        (response) => {
          // Handle success
          console.log('Login successful', response);
          this.successMessage = 'Login successful!'; // Show success message

          // Reset the form and clear validation error styling
          this.loginForm.reset();

          // Explicitly set form controls to pristine, untouched, and valid state
          Object.keys(this.loginForm.controls).forEach(controlName => {
            const control = this.loginForm.get(controlName);
            if (control) {
              control.markAsPristine();    // Mark as pristine so no red styling
              control.markAsUntouched();   // Mark as untouched to not trigger validation
              control.setErrors(null);     // Clear validation errors explicitly
            }
          });

          // Optional: Reset success message after a delay
          setTimeout(() => {
            this.successMessage = null;
          }, 6000); // Success message disappears after 3 seconds
        },
        (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid login credentials'; // Show error message

          // Reset the form and clear validation error styling for invalid login
          this.loginForm.reset();

          // Explicitly set form controls to pristine, untouched, and valid state
          Object.keys(this.loginForm.controls).forEach(controlName => {
            const control = this.loginForm.get(controlName);
            if (control) {
              control.markAsPristine();    // Mark as pristine so no red styling
              control.markAsUntouched();   // Mark as untouched to not trigger validation
              control.setErrors(null);     // Clear validation errors explicitly
            }
          });

          // Optional: Reset error message after a delay
          setTimeout(() => {
            this.errorMessage = null;
          }, 6000); // Error message disappears after 3 seconds
        }
      );
    }
  }
}
