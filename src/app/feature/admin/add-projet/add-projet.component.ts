import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ProjectsService } from '@core/services/projects.service';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-projet',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslocoDirective, TranslocoPipe, AlertComponent],
  templateUrl: './add-projet.component.html',
  styleUrl: './add-projet.component.css'
})
export class AddProjetComponent {

  public projectFormGroup!: FormGroup;
  private projectsService = inject(ProjectsService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  showAlert = signal(false);
  alertClass = signal('');
  alertMessage = signal('');

  private showNotification(message: string, alertClass: string) {
    this.alertMessage.set(message);
    this.alertClass.set(alertClass);
    this.showAlert.set(true);

    setTimeout(() => {
      this.showAlert.set(false);
    }, 1000);
  }

  ngOnInit() {
    this.projectFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async addSubmit() {
    if (this.projectFormGroup.invalid) {
      this.showNotification('alertMessage.messageRequiredFields', 'warring');
      return;
    }
    try {
      const newProject = await firstValueFrom(this.projectsService.addProject(this.projectFormGroup.value));
      this.showNotification('alertMessage.messageAddSuccess', 'success');
      setTimeout(() => {
        this.router.navigateByUrl(`admin/projects`);
      }, 1500);
    } catch (err) {
      console.error("Error:", err);
      this.showNotification('alertMessage.messageAddError', 'error');
    }
  }
}
