import {Component, inject, OnInit, signal, Signal} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../shared/models/user.model';
import { FullNamePipe } from '../../shared/pipes/full-name.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [
    FullNamePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  userData: Signal<UserModel | null> = signal(null);

  ngOnInit() {
    this.authService.syncUserData();
    this.userData = this.authService.currentUser;
  }

  onLogOut = () => {
    this.authService.logOut();
    void this.router.navigate(['login']);
  }
}
