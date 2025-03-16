import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Firma } from '../models/Firma';
import { User } from '../models/User';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  constructor(private loginService: LoginService, private router: Router) { }

  ownerCount: number=0;
  decoratorCount: number=0;
  gardenCount: number=0;
  jobCount24: number=0;
  jobCount7: number=0;
  jobCount30: number=0;
  firms: Firma[] = [];
  workers: User[] = [];
  searchName: string="";
  searchAddress: string="";

  ngOnInit(){
    this.getOwnerCount();
    this.getDecoratorCount();
    this.getFirms();
    this.getGardenCount();
    this.get7jobCount();
    this.get24jobCount();
    this.get30jobCount();
  }

  get24jobCount(){
    this.loginService.get24jobCount().subscribe((data:any)=>{
      this.jobCount24 = data;
    })
  }

  get7jobCount(){
    this.loginService.get7jobCount().subscribe((data:any)=>{
      this.jobCount7 = data;
    })
  }

  get30jobCount(){
    this.loginService.get30jobCount().subscribe((data:any)=>{
      this.jobCount30 = data;
    })
  }

  getGardenCount(){
    this.loginService.getGardenCount().subscribe((data:any)=>{
      this.gardenCount = data;
    })
  }

  getOwnerCount(){
    this.loginService.getOwnerCount().subscribe((data:any)=>{
      this.ownerCount = data;
    })
  }
  getDecoratorCount(){
    this.loginService.getDecoratorCount().subscribe((data:any)=>{
      this.decoratorCount = data;
    })
  }

  getFirms(){
    this.loginService.getFirms().subscribe((data:any)=>{
      this.firms = data;
    })
  }

  sortNameUp() {
      this.firms.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }

  sortNameDown(){
    this.firms.sort((a: any, b: any) => b.name.localeCompare(a.name))
  }

  sortAddressUp() {
    this.firms.sort((a: any, b: any) => a.address.localeCompare(b.address))
  }

  sortAddressDown(){
    this.firms.sort((a: any, b: any) => b.address.localeCompare(a.address))
  }
}
