import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  showAlert: boolean = false;
  alertClassLogin: string = '';
  alertMessageLogin: string = '';

  private handleLoginSucess() {

    this.showAlert = true;
    this.alertClassLogin = '';
    this.alertMessageLogin = 'alertMessage.loginSuccess';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);
  }

  private handleLoginError() {

    this.showAlert = true;
    this.alertClassLogin = '';
    this.alertMessageLogin = 'alertMessage.loginError';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);
  }

  private reRequiredFields() {

    this.showAlert = true;
    this.alertClassLogin = '';
    this.alertMessageLogin = 'alertMessage.errorCredentials';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

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

          this.handleLoginSucess()

          setTimeout(() => {
            this.router.navigateByUrl('admin/projects');
          }, 1500);

        } else {
          this.handleLoginError()
        }
      } catch (error) {
        this.handleLoginError()
      }
    } else {
      this.reRequiredFields()
    }
  }

}
