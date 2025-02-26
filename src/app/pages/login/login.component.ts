import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { InputControlComponent } from '../../shared/components/input-control/input-control.component';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailPatternValidator } from '../../shared/validators/email.validator';
import { AuthService } from '../../auth/auth.service';
import { CredentialsModel } from '../../shared/models/credentials.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private router = inject(Router);

  form = this.fb.group<{ email: FormControl<string | null>, password: FormControl<string | null> }>({
    email: this.fb.control<string | null>(null, [Validators.required, emailPatternValidator()]),
    password: this.fb.control<string | null>(null, Validators.required),
  });

  protected onLogIn(): void {
    console.log(this.form.value);
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.authService.authenticateUser(this.form.value as CredentialsModel).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
        console.log('RES:', res);
        if (!res) {

        } else {
          this.authService.generateAuthToken();
          void this.router.navigate(['dashboard']);
        }
      });
    }
  }

  ngOnInit(): void {
    this.form.controls.email.valueChanges.subscribe(value => {
      console.log('email:', value);
    })
  }

}
