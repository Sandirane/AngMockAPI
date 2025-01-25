import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiErrorService } from '@core/services/api-error.service';
import { AuthService } from '@core/services/auth.service';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const apiErrorService = inject(ApiErrorService);

  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {

        router.navigate(['/auth/login']);

      } else if (error.status === 403) {

        router.navigate(['/notauthorized']);

      }
      apiErrorService?.sendError(error.message);
      throw error;

    })
  );
};
