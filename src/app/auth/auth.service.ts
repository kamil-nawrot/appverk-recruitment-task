import {inject, Injectable, Signal, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../shared/models/user.model';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  public currentUser = signal<UserModel | null>(null);

  authenticateUser(credentials: { email: string, password: string }): Observable<UserModel | undefined> {
    return this.http.get<UserModel[]>('assets/users.json')
      .pipe(
        map(users => users.find((user: UserModel) => user.email === credentials.email && user.password === credentials.password)),
        tap(user => {
          user && this.currentUser.set(user)
          console.log('Current user:', this.currentUser())
        }),
      );
  }

  getUserData(): Signal<UserModel | null> {
    return this.currentUser;
  }

  generateAuthToken(): string {
    const token = crypto.randomUUID();
    localStorage.setItem('access_token', token);

    return token;
  }

  logOut(): void {
    localStorage.removeItem('access_token');
  }
}
