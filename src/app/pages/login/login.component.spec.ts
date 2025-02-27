import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, FormsModule],
      declarations: [],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);

    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email and password controls', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should make the email control required', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the password control required', () => {
    const control = component.form.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should not login with invalid credentials', fakeAsync(() => {
    const invalidUser = { email: 'invalid@mail.com', password: 'invalidPassword' };

    spyOn(authService, 'authenticateUser').and.returnValue(of(undefined));

    component.form.setValue(invalidUser);
    component.onLogIn();

    expect(authService.authenticateUser).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should login successfully with valid credentials', fakeAsync(() => {
    const validUser = { email: 'john.doe@mail.com', password: 'test123' };

    spyOn(authService, 'authenticateUser').and.returnValue(of(validUser));

    component.form.setValue(validUser);
    component.onLogIn();

    expect(component.form.valid).toBeTrue();
    expect(authService.authenticateUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);

  }));

  it('should fill the form on auto-fill button click', () => {
    component.onAutofillLogInForm();
    expect(component.form.value).toEqual({ email: 'john.doe@mail.com', password: 'test123' });
  });
});
