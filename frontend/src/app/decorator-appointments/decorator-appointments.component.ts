import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DecoratorService } from '../services/decorator.service';
import { Firma } from '../models/Firma';
import { User } from '../models/User';
import { Renovation } from '../models/Renovation';

@Component({
  selector: 'app-decorator-appointments',
  templateUrl: './decorator-appointments.component.html',
  styleUrls: ['./decorator-appointments.component.css']
})
export class DecoratorAppointmentsComponent {
  constructor(private router: Router, private decoratorService: DecoratorService) { }

  user: User = new User();
  zakazivanja: Renovation[] = [];
  error: string="";
  state: number=0;
  comment: string="";
  id: string="";
  potvrdjeniPoslovi: Renovation[] = [];

  ngOnInit(){
    let tmp = localStorage.getItem("ulogovan");
    if(tmp) this.user = JSON.parse(tmp);
    this.getZakazivanja();
    this.getPotvrdjenePoslove()
  }

  getPotvrdjenePoslove(){
    this.decoratorService.getPotvrdjenePoslove(this.user.username).subscribe((data:any)=>{
      this.potvrdjeniPoslovi = data;
    })
  }

  getZakazivanja(){
    this.decoratorService.getZakazivanja(this.user.firmName).subscribe((data:any)=>{
      this.zakazivanja = data;
      this.zakazivanja.sort((a: Renovation, b: Renovation) => new Date(b.now).getTime() - new Date(a.now).getTime())
    })
  }
  accept(id: string){
    this.decoratorService.acceptRenovation(this.user.username, id).subscribe((data:any)=>{
      if(data){
        this.ngOnInit();
      }
    })
  }

  finishJob(id: string){
    this.decoratorService.finishJob(this.user.username, id).subscribe((data:any)=>{
      if(data){
        this.ngOnInit();
      }
    })
  }

  decline(id: string){
    this.state = 1;
    this.id = id;
  }
  submit(){
    this.decoratorService.submit(this.user.username, this.id, this.comment).subscribe((data:any)=>{
      if(data){
        this.ngOnInit();
      }
    })
  }
}
