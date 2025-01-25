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

}
