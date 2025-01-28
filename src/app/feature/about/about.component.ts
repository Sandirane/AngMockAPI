import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder } from '@angular/forms';
import { I18nService } from '@core/services/i18n.service';
import { TranslocoDirective } from '@ngneat/transloco';

interface EventItem {
  name?: string;
  decription?: string;
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
    { name: 'Angular 19', icon: 'desktop', decription: 'Framework open source, basé sur TypeScript' },
    { name: 'PrimeNG', icon: 'prime',  decription: 'PrimeNG est une bibliothèque open-source de composants UI conçue pour Angular' },
    { name: 'MockAPI', icon: 'globe',  decription: 'MockAPI est un outil simple qui vous permet de facilement créer des API, de générer des données personnalisées et d\'effectuer des opérations dessus à l\'aide de l\'interface RESTful.' },
    { name: 'Github', icon: 'github',  decription: 'Lien du projet ici : https://github.com/Sandirane/AngMockAPI/tree/PrimeNg' },
    { name: 'Transloco', icon: 'language',  decription: 'Transloco permet de définir des traductions de contenu dans différentes langues et de passer facilement de d\'une langue à une autre ' },
  ];

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);

  constructor() {
    this.langCtrl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(lang => this.i18nService.changeLanguage(lang));
  }

}
