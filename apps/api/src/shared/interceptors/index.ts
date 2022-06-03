import { DuplicatedKeyExceptionInterceptor } from './typeorm/duplicated-key.interceptor';
import { ErrorHandlerInterceptor } from './global-error-handler.interceptor';

export { DuplicatedKeyExceptionInterceptor, ErrorHandlerInterceptor };

export const globalInterceptors = [
  new ErrorHandlerInterceptor(),
  new DuplicatedKeyExceptionInterceptor(),
];
