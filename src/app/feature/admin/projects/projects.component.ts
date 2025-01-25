import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Project } from '@core/models/project';
import { ProjectsService } from '@core/services/projects.service';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  public projects: Project[] = [];
  private projectsService = inject(ProjectsService);
  
  isLoading: boolean = true;

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

}
