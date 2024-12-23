import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3030'; // Base API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Key': "I'M_A_FRONTEND_DEVELOPER_AND_I_WANT_TO_JOIN_THE_TEAM", // Add your actual API key if required
    });

    return this.http.post<any>(
      `${this.apiUrl}/auth/login`, // Login endpoint
      { email, password },
      { headers }
    );
  }

  signup(
    name: string,
    lastname: string,
    email: string,
    password: string,
    repassword: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Key': "I'M_A_FRONTEND_DEVELOPER_AND_I_WANT_TO_JOIN_THE_TEAM", // Add your actual API key if required
    });

    // Make POST request with full signup details
    return this.http.post<any>(
      `${this.apiUrl}/auth/register`, // Registration endpoint
      { name, lastname, email, password, repassword },
      { headers }
    );
  }
}

