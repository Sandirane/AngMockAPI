import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ProjectsService } from '@core/services/projects.service';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-projet',
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
  templateUrl: './add-projet.component.html',
  styleUrl: './add-projet.component.css'
})
export class AddProjetComponent {

  public projectFormGroup!: FormGroup;
  private projectsService = inject(ProjectsService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

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

    this.projectFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  async addSubmit() {

    if (this.projectFormGroup.invalid) {
      this.showToast('warn', 'warn', 'alertMessage.messageRequiredFields');
      return;
    }

    try {
      const newProject = await firstValueFrom(this.projectsService.addProject(this.projectFormGroup.value));
      this.showToast('success', 'success', 'alertMessage.messageAddSuccess');

      setTimeout(() => {
        this.router.navigateByUrl(`admin/projects`);
      }, 1500);

    } catch (err) {

      console.error("Error:", err);
      this.showToast('error', 'error', 'alertMessage.messageAddError');

    }

  }

}
