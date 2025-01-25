import { Routes } from '@angular/router';
import { loggedGuard } from '@core/guards/logged.guard';
import { HomeComponent } from '@feature/home/home.component';
import { NotautorizedComponent } from '@feature/notautorized/notautorized.component';
import { PagenotfoundComponent } from '@feature/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'auth',
        loadChildren: () => import('@feature/auth/authRoutes')
            .then(m => m.authRoutes)
    },
    {
        path: 'admin',
        loadChildren: () => import('@feature/admin/adminRoutes')
            .then(m => m.adminRoutes), canActivate: [loggedGuard]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'notauthorized', component: NotautorizedComponent },
    { path: '**', component: PagenotfoundComponent },
];
