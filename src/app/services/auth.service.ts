import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  DatastoreConfig,
  JsonApiDatastoreConfig,
  JsonApiDatastore,
} from 'angular2-jsonapi';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { Refresh } from '../models/refresh';
import { HttpClient } from '@angular/common/http';
import { roles } from '../models/roles';

const config: DatastoreConfig = {
  baseUrl: `${environment.baseUrl}/auth`,
  models: {
    login: Login,
    refresh: Refresh,
  },
};

@Injectable({
  providedIn: 'root',
})
@JsonApiDatastoreConfig(config)
export class AuthService extends JsonApiDatastore {
  constructor(private router: Router, public http: HttpClient) {
    super(http);
  }

  /**
   * Get token from localStorage
   */
  get getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * Get refresh token from localStorage
   */
  get getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  loggedIn() {
    return !!this.getToken;
  }

  get getRole(): string {
    return roles[Number(localStorage.getItem('role')) - 1];
  }
}
