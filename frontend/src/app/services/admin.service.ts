import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Firma } from '../models/Firma';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/admin";

  getAllUsers(){
    return this.http.get<User[]>(`${this.uri}/getAllUsers`);
  }

  getAllFirms(){
    return this.http.get<Firma[]>(`${this.uri}/getAllFirms`);
  }

  acceptProfile(username:string){
    return this.http.post(`${this.uri}/acceptProfile`, {username:username});
  }

  declineProfile(username:string){
    return this.http.post(`${this.uri}/declineProfile`, {username:username});
  }

  addDecorator(decorator: User){
    return this.http.post<User>(`${this.uri}/addDecorator`, decorator);
  }

  getUser(username:string){
    return this.http.post(`${this.uri}/editUser`, {username:username});
  }

  update(user: User, username: string){
    return this.http.post<String>(`${this.uri}/updateUser`, {user:user, username:username});
  }

  addFirm(firm: Firma){
    return this.http.post<String>(`${this.uri}/addFirm`, {firm:firm});
  }

  getFreeDecorators(){
    return this.http.get<User[]>(`${this.uri}/getFreeDecorators`);
  }

  setWorking(username:string){
    return this.http.post(`${this.uri}/setWorking`, {username:username});
  }
}

