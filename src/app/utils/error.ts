import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as Sentry from '@sentry/angular';

export function HandleHttpResponseError(error: HttpErrorResponse) {
  console.log(error);
  Sentry.captureException(error);
  return throwError('ups');
}
