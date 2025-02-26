import {Component, inject, OnInit} from '@angular/core';
import { InputControlComponent } from '../../shared/components/input-control/input-control.component';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailPatternValidator} from '../../shared/validators/email.validator';

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
export class LoginComponent implements OnInit {

  private readonly fb = inject(FormBuilder);

  form = this.fb.group<{ email: FormControl<string>, password: FormControl<string> }>({
    email: this.fb.nonNullable.control('', [Validators.required, emailPatternValidator()]),
    password: this.fb.nonNullable.control('', Validators.required),
  }, { updateOn: 'submit' });

  protected onLogIn(): void {
    console.log(this.form.value);
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.form.controls.email.valueChanges.subscribe(value => {
      console.log('email:', value);
    })
  }

}
