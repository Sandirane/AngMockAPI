import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { I18nService } from '@core/services/i18n.service';
import { TranslocoDirective } from '@ngneat/transloco';
import { Observable } from 'rxjs';

interface Action {
  title: string;
  route: string;
}

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, TranslocoDirective, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);
  private i18nService = inject(I18nService);
  private authService = inject(AuthService);

  actions: Array<Action> = [
    { title: "menu.home", "route": "/home" },
    { title: "menu.project", "route": "admin/projects" },
    { title: "menu.profile", "route": "admin/profile" },
  ]

  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$();

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);

  constructor() {
    this.langCtrl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(lang => this.i18nService.changeLanguage(lang));
  }

}
