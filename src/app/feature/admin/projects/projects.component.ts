import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  public projects: Project[] = [];
  private projectsService = inject(ProjectsService);

  isLoading: boolean = true;

  selectedProjectId: number | null = null;

  showAlert: boolean = false;
  alertClassDelete: string = '';
  alertMessageDelete: string = '';

  private handleDeleteSucess() {
    this.showAlert = true;
    this.alertClassDelete = '';
    this.alertMessageDelete = 'alertMessage.messageDeleteSuccess';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  private handleDeleteError() {
    this.showAlert = true;
    this.alertClassDelete = '';
    this.alertMessageDelete = 'alertMessage.messageDeleteError';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

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

    this.selectedProjectId = projectId;

    if (this.selectedProjectId !== null) {
      try {

        await firstValueFrom(this.projectsService.deleteProject(this.selectedProjectId));
        this.projects = this.projects.filter(project => project.id !== this.selectedProjectId);

        this.handleDeleteSucess()

      } catch (err) {

        console.error("Error deleting project:", err);

        this.handleDeleteError()
      }
    }
  }

}
