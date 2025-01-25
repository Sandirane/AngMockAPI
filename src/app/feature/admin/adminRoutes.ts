import { Routes } from "@angular/router";
import { AddProjetComponent } from "./add-projet/add-projet.component";
import { EditProjetComponent } from "./edit-projet/edit-projet.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProjectsComponent } from "./projects/projects.component";

export const adminRoutes: Routes = [
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: 'projects', component: ProjectsComponent },
    { path: 'add-product', component: AddProjetComponent },
    { path: 'project/:id', component: EditProjetComponent },
    { path: 'profile', component: ProfileComponent },
];