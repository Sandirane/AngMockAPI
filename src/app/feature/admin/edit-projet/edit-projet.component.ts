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
  alertClassEdit = signal('');
  alertMessageEdit = signal('');

  private showNotification(type: 'success' | 'error' | 'warring') {
    const messages = {
      success: { class: 'alert alert-success', message: 'alertMessage.messageEditSuccess' }, 
      warring: { class: 'alert alert-danger', message: 'alertMessage.messageRequiredFields' },
      error: { class: 'alert alert-danger', message: 'alertMessage.messageEditError' },
    };

    this.alertClassEdit.set(messages[type].class);
    this.alertMessageEdit.set(messages[type].message);
    this.showAlert.set(true);

    setTimeout(() => this.showAlert.set(false), 1000);
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
      this.showNotification('warring');
      return;
    }
    try {
      await firstValueFrom(this.projectsService.editProject(this.projectFormGroup.value));
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
