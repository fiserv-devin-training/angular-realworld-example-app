import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs/operators';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `http://localhost:3000/api${req.url}` });
  // Simulated network latency: 1-2 seconds
  return next(apiReq).pipe(delay(1000 + Math.random() * 1000));
};
