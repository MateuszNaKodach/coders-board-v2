import { Observable, throwError } from 'rxjs';
import { timer } from 'rxjs';
import { mergeMap, finalize, catchError } from 'rxjs/operators';

//retryWhen(errors => errors.pipe(delay(1000), take(10), concatMap(throwError))
//TODO: Refactor
export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  delayTime = 1000,
  ignoredErrorCodes = [],
}: {
  maxRetryAttempts?: number;
  delayTime?: number;
  ignoredErrorCodes?: number[];
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (retryAttempt > maxRetryAttempts || ignoredErrorCodes.find(e => e === error.status)) {
        return throwError(error);
      }
      console.log(`Attempt ${retryAttempt}: retrying in ${retryAttempt * delayTime}ms`);
      return timer(retryAttempt * delayTime);
    }),
    finalize(() => console.log('We are done!')),
  );
};
