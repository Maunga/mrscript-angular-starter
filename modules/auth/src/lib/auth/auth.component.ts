import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

import { PasswordModule } from 'primeng/password';
import { PrimeModule } from '@core/shared'
import {environment} from 'src/environments/environment';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'lib-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordModule, PrimeModule ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  messageService = inject(MessageService)
  router = inject(Router);
  authenticated = true;
  authenticating = false;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {

    const loggedIn: string | null= localStorage.getItem(environment.JWT_TOKEN_KEY);

    if(loggedIn == null || loggedIn == '') {
      this.authenticated = false
    } else {
      this.router.navigateByUrl('/')
    }
  }
//
onSubmit(): void {
  this.authenticating = true;

  this.authService.keycloakLogin(this.form.getRawValue()).subscribe({
    next: (response: any) => {
      this.authenticating = false;
      localStorage.setItem(environment.JWT_TOKEN_KEY, response.access_token);
      localStorage.setItem(environment.JWT_REFRESH_TOKEN_KEY, response.refresh_token);
      this.authService.currentUserSig.set(response.access_token); // Ensure currentUserSig is properly defined in AuthService
      this.router.navigateByUrl('/');

      //Fetch profile
      this.fetchKeyCloakProfile(this.form.getRawValue().username)
      
    },
    error: (error) => {
      this.authenticating = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: error.message,
      });
    }
  });

}

fetchKeyCloakProfile(username: string): void {
  this.authService.keycloakProfile(username).subscribe({
    next: (response: any) => {
      localStorage.setItem(environment.USER_PROFILE, JSON.stringify(response));
      this.fetchKeyCloakRoles(response.id)
    },
    error: (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Failed to load profile',
      });
    }
  });
}
fetchKeyCloakRoles(userId: string): void {
  this.authService.keycloakRoles(userId).subscribe({
    next: (response: any) => {
      localStorage.setItem(environment.ROLES_KEY, JSON.stringify(response));
    },
    error: (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Failed to load roles',
      });
    }
  });
}

}