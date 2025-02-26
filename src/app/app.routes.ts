import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { signedInGuard, signedOutGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [signedOutGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [signedInGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
