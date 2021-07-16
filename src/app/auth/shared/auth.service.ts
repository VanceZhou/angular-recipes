import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable, of } from 'rxjs';
import { LoginRequestpayload } from '../login/login.request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  getJwtToken() {
      return this.localStorage.retrieve('jwtToken');
  }

  constructor(private httpClient: HttpClient, 
    private localStorage: LocalStorageService, 
    ) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, {responseType: 'text'});
  }

  // send the LoginRequestpayload(username and password) to back end and request login
  login(loginRequestpayload: LoginRequestpayload): Observable<boolean>{
    // once login success, store the LoginResponse to localStorage.
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestpayload )
    .pipe(map(data => {
      this.localStorage.store('jwtToken', data.jwtToken)
      this.localStorage.store('username', data.username)
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      return true;
    }));    

  }

  refreshToken() {
    // construct a refreshTokenPayload as request body to send refresh token back into backend.
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
   
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token', refreshTokenPayload)
    .pipe(tap(response => {
 // when I receive the LoginResponse, clear the old jwtToken and expiration date and change them to new one.
      this.localStorage.clear('jwtToken');
      this.localStorage.clear('expiresAt');

      this.localStorage.store('jwtToken', response.jwtToken);
      this.localStorage.store('expiresAt', response.expiresAt);

    }));
}

  getUsername() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken')
  }
  logout(){
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
   
    return this.httpClient.post('http://localhost:8080/api/auth/logout', refreshTokenPayload)
    .subscribe(Response => {
      // when I receive the LoginResponse, clear the old jwtToken and expiration date and change them to new one.
           this.localStorage.clear('jwtToken');
           this.localStorage.clear('expiresAt');
           this.localStorage.clear('username');
           this.localStorage.clear('refreshToken');
           console.log(Response);
         });
    
  }



}
