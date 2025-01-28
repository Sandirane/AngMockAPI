import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Project } from '@core/models/project';
import { ProjectsService } from '@core/services/projects.service';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-projet',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TranslocoDirective,

    ButtonModule,
    TextareaModule,
    InputTextModule,
    ToastModule,
    MessageModule,
  ],
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

  private messageService = inject(MessageService);
  private transloco = inject(TranslocoService);

  private showToast(severity: string, translationKeySummary: string, translationKeyDetail: string): void {

    const translatedSummary = this.transloco.translate(translationKeySummary);
    const translatedDetail = this.transloco.translate(translationKeyDetail);

    this.messageService.add({
      severity,
      summary: translatedSummary,
      detail: translatedDetail,
      life: 1000,
    });
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
      this.showToast('warn', 'warn', 'alertMessage.messageRequiredFields');
      return;
    }

    try {

      await firstValueFrom(this.projectsService.editProject(this.projectFormGroup.value));
      this.showToast('success', 'success', 'alertMessage.messageEditSuccess');

      setTimeout(() => {
        this.router.navigateByUrl(`admin/projects`);
      }, 1500);

    } catch (err) {

      console.error("Error:", err);
      this.showToast('error', 'error', 'alertMessage.messageEditError');

    }

  }


}
