import { Routes } from '@angular/router';
import { HomeComponent } from '@feature/home/home.component';
import { NotautorizedComponent } from '@feature/notautorized/notautorized.component';
import { PagenotfoundComponent } from '@feature/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'notauthorized', component: NotautorizedComponent },
    { path: '**', component: PagenotfoundComponent },
];
