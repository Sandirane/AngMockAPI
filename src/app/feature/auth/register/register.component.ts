import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse } from '@core/models/users';
import { AuthService } from '@core/services/auth.service';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private messageService = inject(MessageService);
  private transloco = inject(TranslocoService);


  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
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
    if (this.registerForm.valid) {

      const { name, email, password, confirmPassword } = this.registerForm.value;

      if (password === confirmPassword) {
        try {

          const response: AuthResponse = await firstValueFrom(this.authService.register(name, email, password, confirmPassword));

          localStorage.setItem('token', response.token);

          this.showToast('success', 'alertMessage.registerSuccess', 'alertMessage.registerSuccess');

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);

        } catch (error) {
          this.showToast('error', 'alertMessage.registerError', 'alertMessage.registerError');
        }
      } else {
        this.showToast('error', 'alertMessage.registerError', 'alertMessage.registerError');
      }

    } else {
      this.showToast('warn', 'alertMessage.errorCredentials', 'alertMessage.errorCredentials');
    }

  }

}
