import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Firma } from '../models/Firma';
import { Renovation } from '../models/Renovation';
import { Odrzavanje } from '../models/Odrzavanje';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/owner";

  update(user: User, username: string){
    return this.http.post<User>(`${this.uri}/updateUser`, {user:user, username:username});
  }

  getFirms(){
    return this.http.get<Firma[]>(`${this.uri}/getFirms`);
  }

  getFirm(name:string){
    return this.http.post<Firma>(`${this.uri}/getFirm`, {name:name});
  }

  addRenovation(renovation:Renovation){
    return this.http.post<String>(`${this.uri}/addRenovation`, {renovation:renovation});
  }

  getRenovations(username : string){
    return this.http.post<Renovation[]>(`${this.uri}/getRenovations`, {username:username});
  }

  getFinishedRenovations(username : string){
    return this.http.post<Renovation[]>(`${this.uri}/getFinishedRenovations`, {username:username});
  }

  addOdrzavanje(odrzavanje:Odrzavanje){
    return this.http.post<String>(`${this.uri}/addOdrzavanje`, {odrzavanje:odrzavanje});
  }

  getWaitingAppo(username : string){
    return this.http.post<Odrzavanje[]>(`${this.uri}/getWaitingAppo`, {username:username});
  }

  
}
