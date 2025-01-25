import { Routes } from '@angular/router';
import { AddProjetComponent } from '@feature/admin/add-projet/add-projet.component';
import { EditProjetComponent } from '@feature/admin/edit-projet/edit-projet.component';
import { ProfileComponent } from '@feature/admin/profile/profile.component';
import { ProjectsComponent } from '@feature/admin/projects/projects.component';
import { LoginComponent } from '@feature/auth/login/login.component';
import { RegisterComponent } from '@feature/auth/register/register.component';
import { HomeComponent } from '@feature/home/home.component';
import { NotautorizedComponent } from '@feature/notautorized/notautorized.component';
import { PagenotfoundComponent } from '@feature/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    
    { path: 'projects', component: ProjectsComponent },
    { path: 'add-product', component: AddProjetComponent },
    { path: 'project/:id', component: EditProjetComponent },
    { path: 'profile', component: ProfileComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'notauthorized', component: NotautorizedComponent },
    { path: '**', component: PagenotfoundComponent },
];
