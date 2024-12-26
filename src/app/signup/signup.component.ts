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

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
  passwordErrorMessage: string | null = null; // New password error message

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private matIconRegistry: MatIconRegistry,  // Inject MatIconRegistry
    private domSanitizer: DomSanitizer // Inject DomSanitizer for icon URLs
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', [Validators.required]], // Add repassword control for validation
    });

    // Register the Google icon from an SVG path (update path accordingly)
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('icons/google.svg')
    );

    // Register the Facebook icon from an SVG path (adjusted path)
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('icons/facebook.svg')
    );
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { name, lastname, email, password, repassword } = this.signupForm.value;
    
      // Check if passwords match
      if (password !== repassword) {
        this.errorMessage = 'Passwords do not match!';
        this.successMessage = null;
        this.passwordErrorMessage = null; // Clear password error
        return;
      }
    
      // Check if password length is less than 6 characters
      if (password.length < 6) {
        this.passwordErrorMessage = 'Password has to be at least 6 characters!';
        this.errorMessage = null; // Clear other error messages
  
        // Set a timeout to clear the password error message after 6 seconds
        setTimeout(() => {
          this.passwordErrorMessage = null;
        }, 6000);  // Password error message stays for 6 seconds
    
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
      // Handle form validation errors based on individual validation rules
      if (this.signupForm.get('password')?.invalid && this.signupForm.get('password')?.touched) {
        this.passwordErrorMessage = 'Password has to be at least 6 characters!';
        this.errorMessage = null;  // Clear other error messages
      } else if (this.signupForm.invalid) {
        // If the form is invalid, display the general error message
        this.errorMessage = 'Please fill in all required fields correctly.';
        this.passwordErrorMessage = null;  // Clear password-specific error
      }
      this.successMessage = null;
    
      // Set a timeout to clear the error message after 6 seconds
      setTimeout(() => {
        this.errorMessage = null;
        this.passwordErrorMessage = null;
      }, 6000);  // Error message stays for 6 seconds
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
