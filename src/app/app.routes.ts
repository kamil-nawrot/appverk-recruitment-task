import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { signedInGuard, signedOutGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [signedOutGuard], title: 'AppVerk Recruitment Task - Sign In' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [signedInGuard], title: 'AppVerk Recruitment Task - Dashboard' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
