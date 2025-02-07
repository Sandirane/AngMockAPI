import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '@core/models/project';
import { ProjectsService } from '@core/services/projects.service';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterLink, TranslocoDirective, TranslocoPipe, AlertComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  public projects = signal<Project[]>([]);
  private projectsService = inject(ProjectsService);
  selectedProjectId: number | null = null;

  isLoading = signal(true);

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

  async ngOnInit() {
    try {
      const data = await firstValueFrom(this.projectsService.getAllProjects());
      setTimeout(() => {
        this.projects.set(data);
        this.isLoading.set(false);
      }, 1000);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  async deleteSubmit(projectId: number) {
    this.selectedProjectId = projectId;
    if (this.selectedProjectId !== null) {
      try {
        await firstValueFrom(this.projectsService.deleteProject(this.selectedProjectId));
        const updatedProjects = this.projects().filter(project => project.id !== this.selectedProjectId);
        this.projects.set(updatedProjects);
        this.showNotification('alertMessage.messageDeleteSuccess', 'success');
      } catch (err) {
        console.error("Error deleting project:", err);
        this.showNotification('alertMessage.messageDeleteError', 'error');
      }
    }
  }

}
