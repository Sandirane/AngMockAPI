import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiErrorService } from '@core/services/api-error.service';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MenuComponent } from '@shared/components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  message = ''

  showAlert: boolean = false;

  private apiErrorService = inject(ApiErrorService);

  ngOnInit() {

    this.apiErrorService.apiError
      .subscribe(
        data => {
          alert(this.message = data)
          // this.message = data
          //this.showAlert = true
        }
      )
  }
}
