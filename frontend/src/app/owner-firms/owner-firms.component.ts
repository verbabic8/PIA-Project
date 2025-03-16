import { Component } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { Router } from '@angular/router';
import { Firma } from '../models/Firma';

@Component({
  selector: 'app-owner-firms',
  templateUrl: './owner-firms.component.html',
  styleUrls: ['./owner-firms.component.css']
})
export class OwnerFirmsComponent {
  constructor(private ownerService: OwnerService, private router: Router) { }

  firms: Firma[] = [];
  searchName: string="";
  searchAddress: string="";

  ngOnInit(){
    this.getFirms();
  }

  getFirms(){
    this.ownerService.getFirms().subscribe((data:any)=>{
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

  info(name:string){
    this.router.navigate(['firmsInfo', name]);
  }
}
