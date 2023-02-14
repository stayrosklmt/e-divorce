import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCredentials } from '../interfaces/LoginCredentials';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'http://localhost:8080/api/v1/auth/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }

  private login$ = new BehaviorSubject<any>({});
  isLogIn$ = this.login$.asObservable();
  
  private token$ = new BehaviorSubject<any>({});
  jwtToken$ = this.token$.asObservable();

  constructor(private http:HttpClient, private router:Router) {}
  
  login(credentials: LoginCredentials){
    return this.http.post(`${this.url}authenticate`, credentials, this.httpOptions);
  }

  resetPassword(usr: string, currentPass: string, newPass: string){
    const data = {
      username: usr,
      currentPassword: currentPass,
      newPassword: newPass
    }
    return this.http.post(`${this.url}reset-password`, data, this.httpOptions)
  }

  isAuthorized(role: String){
    const temp:any = localStorage.getItem("user");
    const user = JSON.parse(temp);
    if (user.role != role) {
      this.router.navigate(['/not-authorized'])
    }
  }

  isLogIn(): boolean {
    return localStorage.getItem("user") != null;
  }

  setLogIn(logIn: boolean) {
    this.login$.next(logIn);
  }
  
  setToken(token: string) {
    this.token$.next(token);
  }
}
