import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@ngneat/transloco';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-notautorized',
  imports: [RouterLink, TranslocoDirective, MessageModule, ButtonModule],
  templateUrl: './notautorized.component.html',
  styleUrl: './notautorized.component.css'
})
export class NotautorizedComponent {

}
