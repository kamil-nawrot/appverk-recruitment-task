import { Pipe, PipeTransform } from '@angular/core';
import {UserModel} from '../models/user.model';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: UserModel | null): string {
    return user ? `${user.firstName} ${user.lastName}` : '-';
  }
}
