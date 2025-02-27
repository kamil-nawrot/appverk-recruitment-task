import { Component, DestroyRef, inject } from '@angular/core';
import { InputControlComponent } from '../../shared/components/input-control/input-control.component';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailPatternValidator } from '../../shared/validators/email.validator';
import { AuthService } from '../../auth/auth.service';
import { CredentialsModel } from '../../shared/models/credentials.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  form = this.fb.group<{ email: FormControl<string | null>, password: FormControl<string | null> }>({
    email: this.fb.control<string | null>(null, [Validators.required, emailPatternValidator()]),
    password: this.fb.control<string | null>(null, Validators.required),
  });

  protected onLogIn(): void {
    this.form.setErrors(null);
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.authService.authenticateUser(this.form.value as CredentialsModel).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
        if (!res) {
          this.form.setErrors({ wrongCredentials: true });
        } else {
          this.authService.generateAuthToken();
          void this.router.navigate(['dashboard']);
        }
      });
    }
  }
}
