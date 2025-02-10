import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse } from '@core/models/users';
import { AuthService } from '@core/services/auth.service';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { AlertComponent } from '@shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslocoDirective, TranslocoPipe, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  showAlert = signal(false);
  alertClassLogin = signal('');
  alertMessageLogin = signal('');

  private showNotification(type: 'success' | 'error' | 'credentials') {
    const messages = {
      success: { class: 'alert alert-success', message: 'alertMessage.loginSuccess' },
      error: { class: 'alert alert-danger', message: 'alertMessage.loginError' },
      credentials: { class: 'alert alert-danger', message: 'alertMessage.errorCredentials' },
    };

    this.alertClassLogin.set(messages[type].class);
    this.alertMessageLogin.set(messages[type].message);
    this.showAlert.set(true);

    setTimeout(() => this.showAlert.set(false), 1000);
  }

  loginForm: FormGroup = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]

  })

  async onSubmit() {
    if (this.loginForm.valid) {

      const { email, password } = this.loginForm.value;

      try {

        const response: AuthResponse | undefined = await this.authService.login(email, password).toPromise();

        if (response) {

          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.showNotification('success');

          setTimeout(() => {
            this.router.navigateByUrl('admin/projects');
          }, 1500);

        } else {
          this.showNotification('error');
        }
      } catch (error) {
        this.showNotification('error');
      }
    } else {
      this.showNotification('credentials');
    }
  }

}
