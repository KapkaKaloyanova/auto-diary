import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifService = inject(NotificationService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let message = 'There is some error';

      if (err.status === 0) {
        message = 'Can not connect to the server'
      } else if (err.error?.message) {
        message = err.error.message
      } else if (err.status === 401) {
        message = 'Unauthorized access';
      } else if (err.status === 403) {
        message = 'Forbidden';
      } else if (err.status === 404) {
        message = 'Resource not found';
      } else if (err.status >= 500) {
        message = 'Server error! Try again later';
      }

      notifService.error(message);
      return throwError(() => err);
    })

  );
};
