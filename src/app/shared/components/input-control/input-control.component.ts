import {
  AfterContentInit,
  Component, DestroyRef,
  forwardRef, inject,
  Injector,
  input
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControlName, FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, TouchedChangeEvent,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-control',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputControlComponent), multi: true },
  ]
})
export class InputControlComponent implements ControlValueAccessor, AfterContentInit {
  label = input('');
  type = input<'text' | 'password'>('text');

  private injector = inject(Injector, { self: true, optional: true });
  private readonly destroyRef = inject(DestroyRef);

  control!: AbstractControl<string>;
  value!: string;
  touched = false;
  disabled = false;

  onChange = (value: string) => {}
  onTouched = () => {}

  protected readonly Validators = Validators;

  ngAfterContentInit(): void {
    const control = this.injector?.get(FormControlName);
    if (control) {
      this.control = control.control;
      this.control.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
        if (event instanceof TouchedChangeEvent) {
          this.touched = event.touched;
        }
      })
    }
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(event: any): void {
    this.onChange(event.target.value);
    this.markAsTouched();
  }

  private markAsTouched(): void{
    if (!this.touched){
      this.touched = true;
      this.onTouched();
    }
  }
}
