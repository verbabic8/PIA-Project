import { Component } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Renovation } from '../models/Renovation';

@Component({
  selector: 'app-owner-appointments',
  templateUrl: './owner-appointments.component.html',
  styleUrls: ['./owner-appointments.component.css']
})
export class OwnerAppointmentsComponent {
  constructor(private ownerService: OwnerService, private router: Router) { }

  user:User = new User();
  renovations: Renovation[] = [];

  ngOnInit(){
    let tmp = localStorage.getItem("ulogovan");
    if(tmp) this.user = JSON.parse(tmp);
    this.getRenovations();
  }

  getRenovations(){
    this.ownerService.getRenovations(this.user.username).subscribe((data:any)=>{
      this.renovations = data;
    })
  }
}
