import { Component } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { Router } from '@angular/router';
import { Renovation } from '../models/Renovation';
import { User } from '../models/User';
import { Odrzavanje } from '../models/Odrzavanje';
import { Firma } from '../models/Firma';

@Component({
  selector: 'app-owner-maintenance',
  templateUrl: './owner-maintenance.component.html',
  styleUrls: ['./owner-maintenance.component.css']
})
export class OwnerMaintenanceComponent {
  constructor(private ownerService: OwnerService, private router: Router) { }

  finishedRenovations: Renovation[] = [];
  waitingAppointments: Odrzavanje[] = [];
  user: User = new User();
  newAppo: Odrzavanje = new Odrzavanje();
  error: string="";

  ngOnInit(){
    let tmp = localStorage.getItem("ulogovan");
    if(tmp) this.user = JSON.parse(tmp);
    this.getFinishedRenovations()
    this.getWaitingAppo();
  }

  getFinishedRenovations(){
    this.ownerService.getFinishedRenovations(this.user.username).subscribe((data:any)=>{
      this.finishedRenovations = data;
      console.log(this.finishedRenovations);
    })
  }

  testDate(dateFinish: Date, dateLast: Date){
    var now = new Date();
    var lastVisit = new Date(dateLast);
    var finishDate = new Date(dateFinish);
    if(lastVisit.getTime() >= finishDate.getTime()){
      if(now.getFullYear() == lastVisit.getFullYear()){
        if(now.getMonth() > lastVisit.getMonth() + 6){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        if(now.getFullYear() > lastVisit.getFullYear()){
          return true;
        }
        else{
          return false;
        }
      }
    }
    else{
      if(now.getFullYear() == finishDate.getFullYear()){
        if(now.getMonth() > finishDate.getMonth() + 6){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        if(now.getFullYear() > finishDate.getFullYear()){
          return true;
        }
        else{
          return false;
        }
      }
    }
  }

  makeAppo(renovation: Renovation){
    this.newAppo.area = renovation.area;
    this.newAppo.username = renovation.username;
    this.newAppo.finishDate = renovation.finishDate;
    this.newAppo.lastVisit = renovation.lastVisit;
    this.newAppo.type = renovation.type;
    this.newAppo.firm = renovation.firm;
    this.newAppo.decorator = renovation.decorator;
    this.newAppo.poolCnt = renovation.poolCnt;
    this.newAppo.fountainCnt = renovation.fountainCnt;
    this.newAppo.now = new Date();

    this.ownerService.addOdrzavanje(this.newAppo).subscribe((data:any)=>{
      console.log(data);
      if(data == "ok"){
        alert("Uspesno ste zakazali servis vodenih povrsina!");
        this.ngOnInit();
      }
      if(data == "godisnji"){
        this.error = "Firma je tad na godisnjem odmoru!";
        return;
      }
    })
  }

  getWaitingAppo(){
    this.ownerService.getWaitingAppo(this.user.username).subscribe((data:any)=>{
      this.waitingAppointments = data;
    })
  }
}
