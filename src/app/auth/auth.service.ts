import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../shared/models/user.model';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  authenticateUser(credentials: { email: string, password: string }): Observable<UserModel | undefined> {
    return this.http.get<UserModel[]>('assets/users.json')
      .pipe(
        tap(console.log),
        map(users => users.find((user: UserModel) => user.email === credentials.email && user.password === credentials.password)),
      );
  }

  generateAuthToken(): string {
    const token = crypto.randomUUID();
    localStorage.setItem('access_token', token);

    return token;
  }
}
