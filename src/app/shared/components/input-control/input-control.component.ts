import {
  AfterContentInit,
  Component,
  forwardRef,
  Injector,
  input,
  Optional,
  Self
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl, FormControlName, FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {JsonPipe} from '@angular/common';

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

  control!: AbstractControl<string>;
  value = '';
  touched = false;
  disabled = false;

  onChange = (value: string) => {}
  onTouched = () => {}

  protected readonly Validators = Validators;

  constructor(@Optional() @Self() private injector: Injector) {}

  ngAfterContentInit(): void {
    const control = this.injector.get(FormControlName);
    if (control) {
      console.log('CONTROL:', control, 'VALUE:', this.value);
      this.control = control.control;
    }
  }

  writeValue(value: string) {
    console.log('value:', value);
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
    if(!this.touched){
      this.touched = true;
      this.onTouched();
    }
  }

  protected readonly FormControl = FormControl;
}
