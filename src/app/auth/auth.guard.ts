import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const signedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    return true;
  } else return router.parseUrl('/login');
};

export const signedOutGuard: CanActivateFn = () => {
  const accessToken = localStorage.getItem('access_token');
  const router = inject(Router);

  if (!accessToken) {
    return true;
  } else return router.parseUrl('/dashboard');
};
