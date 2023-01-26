import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = "http://localhost:3000";

  constructor(
    private http:HttpClient,
    private route: Router
  ) { }

  public login(payload : {email: string, password: string}): Observable<any> {
    return this.http.post<{token : string}>(`${this.URL}/sign`, payload).pipe(
      map(res => {
        localStorage.removeItem("access-token");
        localStorage.setItem("access-token", res.token);
        this.route.navigate(['/home']);
      }),
      catchError( error => {
        if(error.error.message) return throwError(() => error.error.message)
        return throwError(() => "Servidor indisponível! tente novamente mais tarde")
      })
    )
  }

  public logout(){
    localStorage.removeItem("access-token");
    this.route.navigate(['']);
  }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem("access-token");
    const jwtHelper = new JwtHelperService;

    if(token && !jwtHelper.isTokenExpired(token)) return true;

    return false;
  }
}
