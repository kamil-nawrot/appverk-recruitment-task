import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password'
})
export class PasswordPipe implements PipeTransform {

  transform(password?: string, hidden = true): string {
    return password ? hidden ? ' * '.repeat(password.length) : password : '-';
  }

}
