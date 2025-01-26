import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ProjectsService } from '@core/services/projects.service';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-projet',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslocoDirective, TranslocoPipe, AlertComponent],
  templateUrl: './add-projet.component.html',
  styleUrl: './add-projet.component.css'
})
export class AddProjetComponent {

  public projectFormGroup!: FormGroup;
  private projectsService = inject(ProjectsService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  showAlert: boolean = false;
  alertClassAdd: string = '';
  alertMessageAdd: string = '';

  private handleAddSucess() {
    this.showAlert = true;
    this.alertClassAdd = '';
    this.alertMessageAdd = 'alertMessage.messageAddSuccess';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  private handleAddError() {
    this.showAlert = true;
    this.alertClassAdd = '';
    this.alertMessageAdd = 'alertMessage.messageAddError';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  private reRequiredFields() {
    this.showAlert = true;
    this.alertClassAdd = '';
    this.alertMessageAdd = 'alertMessage.messageRequiredFields';

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  ngOnInit() {

    this.projectFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  async addSubmit() {

    if (this.projectFormGroup.invalid) {
      this.reRequiredFields()
      return;
    }

    try {
      const newProject = await firstValueFrom(this.projectsService.addProject(this.projectFormGroup.value));
      this.handleAddSucess()
      
      setTimeout(() => {
        this.router.navigateByUrl(`admin/projects`);
      }, 1500);

    } catch (err) {

      console.error("Error:", err);
      this.handleAddError()

    }

  }

}
