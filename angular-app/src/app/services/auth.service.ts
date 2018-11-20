import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'code_shopping_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    const token = this.getToken()
    this.setUserFromToken(token)
   }

  me: User = null

  login(user: {email: string, password: string}): Observable<{token: string}> {
    return this.http
      .post<{token: string}>('http://localhost:8000/api/login', user)
      .pipe(
        tap(response => {
          this.setToken(response.token)
        })
      )
  }

  setToken(token: string) {
    this.setUserFromToken(token)
    window.localStorage.setItem(TOKEN_KEY, token)
  }

  private setUserFromToken(token: string) {
    const payload = new JwtHelperService().decodeToken(token)
    this.me = payload ? {
      id: payload.sub,
      name: payload.name,
      email: payload.email
    } : null
  }

  isAuth(): boolean {
    const token = this.getToken()
    return !new JwtHelperService().isTokenExpired(token, 30)
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY)
  }
}
