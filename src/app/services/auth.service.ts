import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl:string = "http://localhost:8080"

  constructor(private httpClient:HttpClient) { }

  register(credentials: {email: string, password: string}){
    return this.httpClient.post(`${this.apiUrl}/auth/register`, credentials, {responseType: 'text'});
  }

  login(credentials: {email: string, password: string}){
    return this.httpClient.post(`${this.apiUrl}/auth/login`, credentials, {responseType: 'text'});
  }
}
