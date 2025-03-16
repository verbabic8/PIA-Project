import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Firma } from '../models/Firma';
import { Renovation } from '../models/Renovation';
import { Odrzavanje } from '../models/Odrzavanje';

@Injectable({
  providedIn: 'root'
})
export class DecoratorService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/decorator";

  update(user: User, username: string){
    return this.http.post<User>(`${this.uri}/updateUser`, {user:user, username:username});
  }

  getFirm(firmName: string){
    return this.http.post<Firma>(`${this.uri}/getFirm`, {firmName:firmName});
  }

  getZakazivanja(firmName: String){
    return this.http.post<Renovation[]>(`${this.uri}/getZakazivanja`, {firmName:firmName});
  }

  getPotvrdjenePoslove(username: String){
    return this.http.post<Renovation[]>(`${this.uri}/getPotvrdjenePoslove`, {username:username});
  }

  acceptRenovation(username: string, id: string){
    return this.http.post<String>(`${this.uri}/acceptRenovation`, {username:username, id:id});
  }

  finishJob(username: string, id: string){
    return this.http.post<String>(`${this.uri}/finishJob`, {username:username, id:id});
  }

  submit(username: string, id: string, comment: string){
    return this.http.post<String>(`${this.uri}/submit`, {username:username, id:id, comment:comment});
  }

  getOdrzavanja(firmName: String){
    return this.http.post<Odrzavanje[]>(`${this.uri}/getOdrzavanja`, {firmName:firmName});
  }

  declineOdrzavanje(username: string, id: string){
    return this.http.post<String>(`${this.uri}/declineOdrzavanje`, {username:username, id:id});
  }

  acceptOdrzavanje(username: string, id: string, date: Date){
    return this.http.post<String>(`${this.uri}/acceptOdrzavanje`, {username:username, id:id, date:date});
  }

  getBarData(username: string){
    return this.http.post<Number>(`${this.uri}/getBarData`, {username:username});
  }

  getPieData(firm: string){
    return this.http.post<Number>(`${this.uri}/getPieData`, {firm:firm});
  }

  getHistogramData(){
    return this.http.get<Number>(`${this.uri}/getHistogramData`);
  }
}
