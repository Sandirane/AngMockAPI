import { Component, inject, OnInit } from '@angular/core';
import { User } from '@core/models/users';
import { AuthService } from '@core/services/auth.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-profile',
  imports: [TranslocoDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: User | null = null;
  private authService = inject(AuthService);

  ngOnInit() {
    this.user = this.authService.getUser();
  }
}
