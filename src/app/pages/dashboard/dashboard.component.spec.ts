import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';
import { signal } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let router: Router;

  const mockUser: UserModel = { email: 'test@example.com', password: 'password123', firstName: 'John', lastName: 'Doe' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: { syncUserData: jasmine.createSpy('syncUserData'), currentUser: signal<UserModel | null>(mockUser), logOut: jasmine.createSpy('logOut') } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sync user data on init', () => {
    expect(authService.syncUserData).toHaveBeenCalled();
    expect(component.userData()).toEqual(mockUser);
  });

  it('should log out and navigate to login on log out', () => {
    component.onLogOut();
    expect(authService.logOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should toggle password visibility', () => {
    expect(component.isPasswordHidden()).toBeTrue();
    component.onTogglePasswordVisibility();
    expect(component.isPasswordHidden()).toBeFalse();
    component.onTogglePasswordVisibility();
    expect(component.isPasswordHidden()).toBeTrue();
  });
});
