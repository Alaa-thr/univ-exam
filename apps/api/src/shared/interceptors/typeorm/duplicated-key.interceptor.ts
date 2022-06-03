import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DuplicatedKeyExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.log('error lkjflkjflkdjfl');
        if (error.code === '23505') {
          let value = error.detail.split('(')[1].split(')')[0];
          if (value.includes('"')) value = value.split('"')[1];
          const message = 'ERROR_' + value.toUpperCase() + '_ALREADY_USED';
          throw new HttpException([message], 400);
        } else return throwError(error);
      })
    );
  }
}
