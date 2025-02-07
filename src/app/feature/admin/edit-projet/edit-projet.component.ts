import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Project } from '@core/models/project';
import { ProjectsService } from '@core/services/projects.service';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-projet',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslocoDirective, TranslocoPipe, AlertComponent],
  templateUrl: './edit-projet.component.html',
  styleUrl: './edit-projet.component.css'
})
export class EditProjetComponent {

  projectId!: number;
  public projectFormGroup!: FormGroup;

  private projectsService = inject(ProjectsService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);

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
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.projectFormGroup = this.fb.group({
      id: [this.projectId],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.loadProject();
  }

  async loadProject() {
    try {
      const project: Project = await firstValueFrom(this.projectsService.getProjectById(this.projectId));
      this.projectFormGroup.patchValue({
        name: project.name,
        description: project.description
      });
    } catch (err) {
      console.error("Error loading project:", err);
    }
  }

  async editSubmit() {
    if (this.projectFormGroup.invalid) {
      this.showNotification('alertMessage.messageRequiredFields', 'warring');
      return;
    }
    try {
      await firstValueFrom(this.projectsService.editProject(this.projectFormGroup.value));
      this.showNotification('alertMessage.messageEditSuccess', 'success');
      setTimeout(() => {
        this.router.navigateByUrl(`admin/projects`);
      }, 1500);
    } catch (err) {
      console.error("Error:", err);
      this.showNotification('alertMessage.messageEditError', 'error');
    }
  }
}
