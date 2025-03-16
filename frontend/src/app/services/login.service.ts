import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Firma } from '../models/Firma';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/login";

  login(username: string, password: string) {
    let data = {
      username: username,
      password: password,
    }
    return this.http.post<User>(`${this.uri}/login`, data);
  }

  loginAdmin(username: string, password: string){
    let data = {
      username: username,
      password: password,
    }
    return this.http.post<User>(`${this.uri}/loginAdmin`, data);
  }

  register(user: User) {
    return this.http.post<User>(`${this.uri}/register`, user);
  }

  changePassword(username:string, oldPassword:string, newPassword:string){
    let data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.http.post<User>(`${this.uri}/change`, data);
  }

  get24jobCount(){
    return this.http.get<Number>(`${this.uri}/get24jobCount`);
  }

  get7jobCount(){
    return this.http.get<Number>(`${this.uri}/get7jobCount`);
  }

  get30jobCount(){
    return this.http.get<Number>(`${this.uri}/get30jobCount`);
  }

  getOwnerCount(){
    return this.http.get<Number>(`${this.uri}/getOwnerCount`);
  }

  getGardenCount(){
    return this.http.get<Number>(`${this.uri}/getGardenCount`);
  }

  getDecoratorCount(){
    return this.http.get<Number>(`${this.uri}/getDecoratorCount`);
  }

  getFirms(){
    return this.http.get<Firma[]>(`${this.uri}/getFirms`);
  }
}
