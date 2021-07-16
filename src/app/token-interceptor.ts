import {Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth/shared/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';


@Injectable({
    providedIn: 'root'
})

// TokenInterceptor is to pause all the following requests when the program detected the jwtToken is invalid, 
// then call the handleAuthErrors that will call the refreshToken function to refresh the token.
export class TokenInterceptor implements HttpInterceptor{
    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService){}
    
    // block the next request and handle the Jwt token first.
    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
        // inject the jwt token that I receive from login
        const jwtToken = this.authService.getJwtToken();
        if (jwtToken) {
            this.addToken(req, jwtToken);
        }
        return  next.handle(req).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse
                    && error.status === 403) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
                }
            }));
        }
        

    
    handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.isTokenRefreshing){
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);
            
            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) =>{
                this.isTokenRefreshing = false;
                this.refreshTokenSubject
                    .next(refreshTokenResponse.jwtToken);
                return next.handle(this.addToken(req, refreshTokenResponse.jwtToken));
        })
        )
    }else {
        return this.refreshTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap((res) => {
                return next.handle(this.addToken(req,
                    this.authService.getJwtToken()))
            })
        );
    }

    }

    // use it as authorization.
    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
        });
    }

}