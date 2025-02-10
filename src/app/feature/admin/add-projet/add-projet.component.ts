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
  alertClassAdd = signal('');
  alertMessageAdd = signal('');

  private showNotification(type: 'success' | 'error' | 'warring') {
    const messages = {
      success: { class: 'alert alert-success', message: 'alertMessage.messageAddSuccess' },
      warring: { class: 'alert alert-danger', message: 'alertMessage.messageRequiredFields' },
      error: { class: 'alert alert-danger', message: 'alertMessage.messageAddError' },
    };

    this.alertClassAdd.set(messages[type].class);
    this.alertMessageAdd.set(messages[type].message);
    this.showAlert.set(true);

    setTimeout(() => this.showAlert.set(false), 1000);
  }

  ngOnInit() {
    this.projectFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async addSubmit() {
    if (this.projectFormGroup.invalid) {
      this.showNotification('warring');
      return;
    }
    try {
      const newProject = await firstValueFrom(this.projectsService.addProject(this.projectFormGroup.value));
      this.showNotification('success');
      setTimeout(() => {
        this.router.navigateByUrl(`admin/projects`);
      }, 1500);
    } catch (err) {
      console.error("Error:", err);
      this.showNotification('error');
    }
  }
}
