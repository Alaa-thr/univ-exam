import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.log('*************************************************');
        console.log(error);
        console.log('*************************************************');
        console.log('message : ' + error.response);
        console.log('status  : ' + error.status);
        console.log('*************************************************');
        if (error.status && error.message){
          const message =  error.response.message || error.response
          
          throw new HttpException({ message:isArray(message)?message :[message]}, error.status);
        } 
        
        throw new HttpException({ message: 'SOMETHING_WENT_WRONG' }, 500);
      })
    );
  }
}
