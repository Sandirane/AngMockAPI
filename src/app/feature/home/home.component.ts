import { Component } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [TranslocoDirective, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
