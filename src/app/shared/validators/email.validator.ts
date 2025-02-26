import {ValidationErrors, ValidatorFn} from '@angular/forms';

export function emailPatternValidator(): ValidatorFn {
  return (control): ValidationErrors | null => {
    const emailRegex: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

    return emailRegex.test(control.value) ? null : { email: 'Provided e-mail address is incorrect.'}
  }
}
