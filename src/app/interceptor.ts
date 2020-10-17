import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            headers: this.getHeaders()
        });

        return next.handle(req);
    }

    private getHeaders(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();

        if (typeof localStorage) {

          if (localStorage.getItem('token')) {
            headers = headers.append('Authorization', localStorage.getItem('token'));
          }
        }

        return headers;
      }
}

