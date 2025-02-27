import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { CredentialsModel } from '../shared/models/credentials.model';
import { UserModel } from '../shared/models/user.model';
import { provideHttpClient } from '@angular/common/http';
import { hashSync } from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUsers: UserModel[] = [
    { email: 'john.doe@mail.com', password: 'test123' },
    { email: 'user@example.com', password: 'password456' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(),  provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user with valid credentials', () => {
    const credentials = { email: 'john.doe@mail.com', password: 'test123' };

    service.authenticateUser(credentials).subscribe(user => {
      expect(user).toEqual(mockUsers[0]);
      expect(service.currentUser()).toEqual(mockUsers[0]);
    });

    const req = httpMock.expectOne('assets/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should not authenticate user with invalid credentials', () => {
    const credentials = { email: 'invalid@example.com', password: 'invalidpassword' };

    service.authenticateUser(credentials).subscribe(user => {
      expect(user).toBeUndefined();
      expect(service.currentUser()).toBeNull();
    });

    const req = httpMock.expectOne('assets/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should sync existing user data from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(hashSync('john.doe@mail.com'));

    service.syncUserData();

    const req = httpMock.expectOne('assets/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    expect(service.currentUser()).toEqual(mockUsers[0]);
  });

  it('should generate auth token', () => {
    service.currentUser.set(mockUsers[0]);
    const token = service.generateAuthToken();
    expect(localStorage.getItem('access_token')).toBe(token);
  });

  it('should log out user', () => {
    spyOn(localStorage, 'removeItem');
    service.logOut();
    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
  });
});

