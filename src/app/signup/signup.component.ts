import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // To navigate after successful registration
import { AuthService } from '../auth.service'; // Ensure AuthService is imported
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ // Import these modules to make Material components work in the template
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule, // This one should be imported here as well
  ],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', [Validators.required]], // Add repassword control for validation
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { name, lastname, email, password, repassword } = this.signupForm.value;

      // Check if passwords match
      if (password !== repassword) {
        this.errorMessage = 'Passwords do not match!';
        this.successMessage = null;
        return;
      }

      // Call the signup service with the form data
      this.authService.signup(name, lastname, email, password, repassword).subscribe({
        next: (response) => {
          console.log("Signup response:", response);  // Server's response to registration
          
          // Reset form and clear any previous errors immediately
          this.signupForm.reset();
          this.clearErrors();

          this.errorMessage = null;
          this.successMessage = 'You have successfully registered!';
          
          // Set a timeout to clear the success message after 6 seconds
          setTimeout(() => {
            this.successMessage = null;
          }, 6000);  // Success message stays for 6 seconds
        },
        error: (error) => {
          console.error("Signup error:", error);  // Log any errors from signup
          this.errorMessage = 'Please fill in all required fields correctly.';
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.successMessage = null;
    }
  }

  // Method to clear any validation errors from the form controls
  private clearErrors(): void {
    Object.keys(this.signupForm.controls).forEach((controlName) => {
      const control = this.signupForm.get(controlName);
      if (control) {
        control.setErrors(null); // Clear any existing errors
        control.markAsUntouched(); // Reset the touched state
        control.markAsPristine();  // Reset the dirty state
      }
    });
  }

  // Navigate to Sign Up page
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Navigate to Home page
  goToHome() {
    this.router.navigate(['/']);
  }

}

