import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder } from '@angular/forms';
import { I18nService } from '@core/services/i18n.service';
import { TranslocoDirective } from '@ngneat/transloco';

interface EventItem {
  name: string;
  description: string
  icon?: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})

export class AboutComponent {

  private fb = inject(NonNullableFormBuilder);
  private i18nService = inject(I18nService);

  events: Array<EventItem> = [
    { name: 'Angular 19', icon: 'desktop', description: 'aboutPage.description1' },
    { name: 'PrimeNG', icon: 'prime', description: 'aboutPage.description2' },
    { name: 'MockAPI', icon: 'globe', description: 'aboutPage.description3' },
    { name: 'Github', icon: 'github', description: 'aboutPage.description4' },
    { name: 'Transloco', icon: 'language', description: 'aboutPage.description5' },
  ];

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);

  constructor() {
    this.langCtrl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(lang => this.i18nService.changeLanguage(lang));
  }

}
