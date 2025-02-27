import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../shared/models/user.model';
import { first, map, Observable, tap } from 'rxjs';
import { compareSync, hashSync } from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  public currentUser = signal<UserModel | null>(null);

  private loadUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('assets/users.json');
  }

  authenticateUser(credentials: { email: string, password: string }): Observable<UserModel | undefined> {
    return this.http.get<UserModel[]>('assets/users.json')
      .pipe(
        map(users => users.find((user: UserModel) => user.email === credentials.email && user.password === credentials.password)),
        tap(user => {
          user && this.currentUser.set(user)
        }),
      );
  }

  syncUserData(): void {
    this.loadUsers().pipe(first()).subscribe(users => {
      const matchingUser = users.find(user => compareSync(user.email, localStorage.getItem('access_token') || ''));
      this.currentUser.set(matchingUser || null);
    })
  }

  generateAuthToken(): string {
    const token = hashSync(this.currentUser()!.email);
    localStorage.setItem('access_token', token);
    return token;
  }

  logOut(): void {
    localStorage.removeItem('access_token');
  }
}
