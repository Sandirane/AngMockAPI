import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '@core/models/project';
import { ProjectsService } from '@core/services/projects.service';
import { TranslocoDirective } from '@ngneat/transloco';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { firstValueFrom } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-projects',
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,

    InputTextModule,
    IconField,
    InputIcon,
    TableModule,
    SkeletonModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  public projects: Project[] = [];
  private projectsService = inject(ProjectsService);

  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  private transloco = inject(TranslocoService);

  isLoading: boolean = true;

  selectedProjectId: number | null = null;

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


  async ngOnInit() {

    try {

      const data = await firstValueFrom(this.projectsService.getAllProjects());

      setTimeout(() => {
        this.projects = data;
        this.isLoading = false;
      }, 1000);

    } catch (err) {

      console.error("Error fetching data:", err);

    }
  }

  async deleteSubmit(projectId: number) {

    this.confirmationService.confirm({
      message: this.transloco.translate('projectPage.confirmDeleteMessage'),
      header: this.transloco.translate('projectPage.confirmDeleteTitle'),
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',  
      rejectButtonStyleClass: 'p-button-secondary',  
      acceptLabel: this.transloco.translate('projectPage.confirmYes'), 
      rejectLabel: this.transloco.translate('projectPage.confirmNo'),
      accept: async () => {
        try {
          await firstValueFrom(this.projectsService.deleteProject(projectId));
          this.projects = this.projects.filter(project => project.id !== projectId);
          this.showToast('success', 'success', 'alertMessage.messageDeleteSuccess');
        } catch (err) {
          console.error("Error deleting project:", err);
          this.showToast('error', 'error', 'alertMessage.messageDeleteError');
        }
      },
      reject: () => {
        this.showToast('info', 'info', 'projectPage.deleteCancelled');
      }
    });

  }

  truncateText(text: string, limit: number): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

}
