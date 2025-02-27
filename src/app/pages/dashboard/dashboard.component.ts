import {Component, inject, OnInit, signal, Signal} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../shared/models/user.model';
import { FullNamePipe } from '../../shared/pipes/full-name.pipe';
import {PasswordPipe} from '../../shared/pipes/password.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [
    FullNamePipe,
    PasswordPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  userData: Signal<UserModel | null> = signal(null);
  isPasswordHidden = signal(true);

  ngOnInit() {
    this.authService.syncUserData();
    this.userData = this.authService.currentUser;
  }

  onLogOut = () => {
    this.authService.logOut();
    void this.router.navigate(['login']);
  }

  onTogglePasswordVisibility(): void {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }
}
