import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse } from '@core/models/users';
import { AuthService } from '@core/services/auth.service';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslocoDirective, TranslocoPipe, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  showAlert: boolean = false;
  alertClassRegister: string = '';
  alertMessageRegister: string = '';

  private handleRegisterSucess() {
    this.alertClassRegister = '';
    this.alertMessageRegister = 'alertMessage.registerSuccess';
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  private handleRegisterError() {
    this.alertClassRegister = '';
    this.alertMessageRegister = 'alertMessage.registerError';
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  private reRequiredFields() {
    this.alertClassRegister = '';
    this.alertMessageRegister = 'alertMessage.errorCredentials';
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  async onSubmit() {
    if (this.registerForm.valid) {

      const { name, email, password, confirmPassword } = this.registerForm.value;

      if (password === confirmPassword) {
        try {

          const response: AuthResponse = await firstValueFrom(this.authService.register(name, email, password, confirmPassword));

          localStorage.setItem('token', response.token);

          this.handleRegisterSucess()

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);

        } catch (error) {
          this.handleRegisterError()
        }
      } else {
        this.handleRegisterError()
      }

    } else {
      this.reRequiredFields()
    }

  }

}
