import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcceptDivorce } from '../interfaces/AcceptDivorce';
import { ApprovalRequest } from '../interfaces/ApprovalRequest';
import { CreateUserRequest } from '../interfaces/CreateUserRequest';
import { DivorceRequest } from '../interfaces/DivorceRequest';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  
  private url = 'http://localhost:8080/api/v1/';

  private user!: User;

  private httpOptions: any;
  
  constructor(private http:HttpClient, private router: Router) {
    let temp: any = localStorage.getItem("user");
    if(temp == null) {
      console.error("User have to log in first");
    } else {
      this.user = JSON.parse(temp);      
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + this.user.token,
          'Accept': '*'
        })
      }
    }
  }

  //ADMIN end-points

  getUsers() {
    this.setToken();
    return this.http.get(`${this.url}admin`, this.httpOptions);
  }

  getUser(id: string) {
    this.setToken();
    return this.http.get(`${this.url}admin/${id}`, this.httpOptions);
  }

  updateUser(id:string, user: any) {
    this.setToken();
    return this.http.put(`${this.url}admin/${id}`, user, this.httpOptions);
  }

  createUser(user: CreateUserRequest) {
    this.setToken();
    return this.http.post(`${this.url}admin`, user, this.httpOptions);
  }
  
  deleteUser(id: string) {
    this.setToken();
    return this.http.delete(`${this.url}admin/${id}`, this.httpOptions);
  }

  //LAWYER end-point
  submitDivorce(divorce: DivorceRequest) {
    this.setToken();
    return this.http.post(`${this.url}lawyer`, divorce, this.httpOptions);
  }

  //NOTARY end-points
  getDivorces() {
    this.setToken();
    return this.http.get(`${this.url}notary`, this.httpOptions);
  }

  approveDivorce(approval: ApprovalRequest) {
    this.setToken();
    return this.http.put(`${this.url}notary`, approval, this.httpOptions);
  }
  
  //USER end-points
  getUserDivorce() {
    this.setToken();
    let temp: any = localStorage.getItem("user");
    let id = JSON.parse(temp).id;
    return this.http.get(`${this.url}husband/${id}`, this.httpOptions);
  }
  
  signDivorce(acceptDivorce: AcceptDivorce) {
    this.setToken();
    return this.http.put(`${this.url}husband`, acceptDivorce, this.httpOptions);
  }

  //set tokens on each method else it will keep from last log in token in the http headers
  setToken() {
    let temp: any = localStorage.getItem("user");
    let token = JSON.parse(temp).token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + token);
  }
}
