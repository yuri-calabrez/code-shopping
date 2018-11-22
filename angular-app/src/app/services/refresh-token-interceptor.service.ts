import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          console.log(event)
          this.setNewTokenIfValidResponse(event)
        })
      )
      
  }

  private setNewTokenIfValidResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const authorizationHeader = event.headers.get('authorization')
      console.log(authorizationHeader)
    }
  }
}
