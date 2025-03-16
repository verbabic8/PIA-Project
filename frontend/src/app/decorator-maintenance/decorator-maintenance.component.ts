import { Component } from '@angular/core';
import { User } from '../models/User';
import { Odrzavanje } from '../models/Odrzavanje';
import { DecoratorService } from '../services/decorator.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-decorator-maintenance',
  templateUrl: './decorator-maintenance.component.html',
  styleUrls: ['./decorator-maintenance.component.css']
})
export class DecoratorMaintenanceComponent {
  constructor(private router: Router, private decoratorService: DecoratorService) { }

  user: User = new User();
  odrzavanja: Odrzavanje[] = [];
  error: string="";
  state: number=0;
  id: string="";
  date: Date = new Date();

  ngOnInit(){
    let tmp = localStorage.getItem("ulogovan");
    if(tmp) this.user = JSON.parse(tmp);
    this.getOdrzavanja();
  }

  getOdrzavanja(){
    this.decoratorService.getOdrzavanja(this.user.firmName).subscribe((data:any)=>{
      this.odrzavanja = data;
    })
  }
  accept(id: string){
    this.state = 1;
    this.id = id;
  }
  decline(id: string){
    this.decoratorService.declineOdrzavanje(this.user.username, id).subscribe((data:any)=>{
      if(data){
        this.ngOnInit();
      }
    })
  }
  submit(){
    this.decoratorService.acceptOdrzavanje(this.user.username, this.id, this.date).subscribe((data:any)=>{
      if(data){
        this.ngOnInit();
      }
    })
  }
}
