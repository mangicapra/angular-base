import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  DatastoreConfig,
  JsonApiDatastoreConfig,
  JsonApiDatastore,
} from 'angular2-jsonapi';
import { environment } from 'src/environments/environment';
import { Login, roles, Refresh } from '../../module/auth/model';
import { HttpClient } from '@angular/common/http';

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

  get getToken(): string {
    return localStorage.getItem('token');
  }

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

  get loggedIn() {
    return !!this.getToken;
  }

  get getRole(): string {
    // this is made as presumption that admin will be with id 1
    return roles[Number(localStorage.getItem('role')) - 1];
  }
}
