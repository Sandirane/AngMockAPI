import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  showAlert: boolean = false;
  alertClassEdit: string = '';
  alertMessageEdit: string = '';

  private handleEditSucess() {

    this.showAlert = true;
    this.alertClassEdit = '';
    this.alertMessageEdit = 'alertMessage.messageEditSuccess';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  private handleEditError() {

    this.showAlert = true;
    this.alertClassEdit = '';
    this.alertMessageEdit = 'alertMessage.messageEditError';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  private reRequiredFields() {

    this.showAlert = true;
    this.alertClassEdit = '';
    this.alertMessageEdit = 'alertMessage.messageRequiredFields';

    setTimeout(() => {
      this.showAlert = false;
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
      this.reRequiredFields()
      return;
    }

    try {

      await firstValueFrom(this.projectsService.editProject(this.projectFormGroup.value));
      this.handleEditSucess()
      
      setTimeout(() => {
        this.router.navigateByUrl(`admin/projects`);
      }, 1500);

    } catch (err) {

      console.error("Error:", err);
      this.handleEditError()

    }

  }


}
