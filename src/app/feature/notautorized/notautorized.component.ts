import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-notautorized',
  imports: [RouterLink, TranslocoDirective],
  templateUrl: './notautorized.component.html',
  styleUrl: './notautorized.component.css'
})
export class NotautorizedComponent {

}
