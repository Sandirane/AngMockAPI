import { Component, inject, OnInit } from '@angular/core';
import { User } from '@core/models/users';
import { AuthService } from '@core/services/auth.service';
import { TranslocoDirective } from '@ngneat/transloco';
import { Avatar } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-profile',
  imports: [TranslocoDirective, PanelModule, Avatar],
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
