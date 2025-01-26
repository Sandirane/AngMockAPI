import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@config/environment.development';
import { Project } from '@core/models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private http = inject(HttpClient)

  private apiUrl = environment.apiUrl
  private apiKey = environment.apiKey

  private getHeaders: HttpHeaders = new HttpHeaders({
    'X-Binarybox-Api-Key': this.apiKey,
    'Accept': 'application/json'
  });

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/api/projects`, { headers: this.getHeaders });
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/api/projects/${projectId}`, { headers: this.getHeaders })
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/api/projects`, project, { headers: this.getHeaders })
  }

  editProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/api/projects/${project.id}`, project, { headers: this.getHeaders });
  }

  public deleteProject(projectId: number): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/api/projects/${projectId}`, { headers: this.getHeaders });
  }

}
