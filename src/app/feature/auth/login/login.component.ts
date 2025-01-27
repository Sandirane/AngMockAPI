import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse } from '@core/models/users';
import { AuthService } from '@core/services/auth.service';
import { TranslocoDirective } from '@ngneat/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TranslocoDirective,

    CardModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private messageService = inject(MessageService);
  private transloco = inject(TranslocoService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  private showToast(severity: string, translationKeySummary: string, translationKeyDetail: string): void {

    const translatedSummary = this.transloco.translate(translationKeySummary);
    const translatedDetail = this.transloco.translate(translationKeyDetail);

    this.messageService.add({
      severity,
      summary: translatedSummary,
      detail: translatedDetail,
      life: 1000,
    });

  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        const response: AuthResponse | undefined = await this.authService.login(email, password).toPromise();

        if (response) {
          
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.showToast('success', 'alertMessage.loginSuccess', 'alertMessage.loginSuccess');

          setTimeout(() => {
            this.router.navigateByUrl('admin/projects');
          }, 1500);

        } else {
          this.showToast('error', 'alertMessage.errorLogin', 'alertMessage.loginError');
        }
      } catch (error) {
        this.showToast('error', 'alertMessage.errorLogin', 'alertMessage.loginError');
      }
    } else {
      this.showToast('warn', 'alertMessage.errorCredentials', 'alertMessage.errorCredentials');
    }
  }


}
