import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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

  showAlert = signal(false);
  alertClassRegister = signal('');
  alertMessageRegister = signal('');

  private showNotification(type: 'success' | 'error' | 'warning') {
    const messages = {
      success: { class: 'alert alert-success', message: 'alertMessage.registerSuccess' },
      warning: { class: 'alert alert-danger', message: 'alertMessage.errorCredentials' },
      error: { class: 'alert alert-danger', message: 'alertMessage.registerError' },
    };

    this.alertClassRegister.set(messages[type].class);
    this.alertMessageRegister.set(messages[type].message);
    this.showAlert.set(true);

    setTimeout(() => this.showAlert.set(false), 1000);
  }

  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordsMatchValidator });

  async onSubmit() {
    if (this.registerForm.valid) {

      const { name, email, password, confirmPassword } = this.registerForm.value;

      if (password === confirmPassword) {
        try {

          const response: AuthResponse = await firstValueFrom(this.authService.register(name, email, password, confirmPassword));

          localStorage.setItem('token', response.token);

          this.showNotification('success');

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);

        } catch (error) {
          this.showNotification('error');
        }
      } else {
        this.showNotification('error');
      }

    } else {
      this.showNotification('warning');
    }

  }

}
