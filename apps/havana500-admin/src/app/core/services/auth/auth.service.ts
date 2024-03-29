import { Injectable } from '@angular/core';
import {
  HavanaEnvironment,
  LoginModel,
  User,
  RegisterModel
} from '@hav500workspace/shared';
import { HttpClient } from '@angular/common/http';
import { APP_USER } from '../../configs/configuration-const.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public token: string;
  public apiUrl: string;

  constructor(
    private environment: HavanaEnvironment,
    private http: HttpClient
  ) {
    const currentUser = JSON.parse(localStorage.getItem(APP_USER));
    this.token = currentUser && currentUser.token;
    this.apiUrl = environment.apiUrl;
  }

  login(loginModel: LoginModel): Observable<boolean> {
    return this.http
      .post(this.apiUrl + 'account/authenticate', loginModel)
      .pipe(
        map(result => {
          const token = result['token'];
          if (token) {
            this.token = token;
            const localStorageUser = new User(
              result['id'],
              loginModel.email,
              result['username'],
              token
            );
            localStorage.setItem(APP_USER, JSON.stringify(localStorageUser));
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem(APP_USER);
  }

  register(registerModel: RegisterModel): Observable<boolean> {
    return this.http.post(this.apiUrl + 'account/register', registerModel).pipe(
      map(result => {
        const token = result['token'];
        if (token) {
          this.token = token;
          const localStorageUser = new User(
            result['id'],
            result['email'],
            result['username'],
            token
          );
          localStorage.setItem(APP_USER, JSON.stringify(localStorageUser));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  is_authenticated(): boolean {
    return localStorage.getItem(APP_USER) != null;
    // TODO: check expiration date of the token
  }
}
