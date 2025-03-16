import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../services/owner.service';
import { Firma } from '../models/Firma';
import { Renovation } from '../models/Renovation';
import { Usluga } from '../models/Usluga';
import { User } from '../models/User';

@Component({
  selector: 'app-firms-info',
  templateUrl: './firms-info.component.html',
  styleUrls: ['./firms-info.component.css']
})
export class FirmsInfoComponent {
  constructor(private activeRoute: ActivatedRoute, private ownerService: OwnerService, private router: Router) { }

  name:string="";
  user: User = new User();
  firm: Firma = new Firma();
  renovation: Renovation = new Renovation();
  step: number=1;
  error: string="";
  usluge: {Usluga: Usluga, boolean: false}[] = []


  ngOnInit(){
    this.name = this.activeRoute.snapshot.paramMap.get('name') || '';
    this.getFirm(this.name);
    let tmp = localStorage.getItem("ulogovan");
    if(tmp) this.user = JSON.parse(tmp);
  }

  getFirm(name:string){
    this.ownerService.getFirm(name).subscribe((data:any)=>{
      this.firm = data;
      this.usluge = this.firm.usluge.map((usluga: any) => {
        return { Usluga: usluga, boolean: false };
      });
    })
  }

  nextStep(){
    if(!this.renovation.date || this.renovation.area == 0 || this.renovation.type==""){
      this.error="Morate popuniti sva polja";
      return;
    }
    if(new Date(this.renovation.date).getTime() >= new Date(this.firm.start).getTime() && new Date(this.renovation.date).getTime() <= new Date(this.firm.end).getTime()){
      this.error = "Firma je u tom periodu na godisnjem odmoru!";
      return;
    }
    if(this.renovation.type == "private"){ this.step = 2; this.error="";}
    else{ this.step = 3; this.error = "";}
  }

  newRenovation(){
    if(this.renovation.type == "private"){
      if((this.renovation.poolArea + this.renovation.greenArea + this.renovation.tableArea) != this.renovation.area){
        this.error = "Kvadrature se ne poklapaju!";
        return;
      }
    }
    else{
      if((this.renovation.fountainArea + this.renovation.greenArea) > this.renovation.area){
        this.error = "Kvadrature se ne poklapaju!";
        return;
      }
    }
    this.renovation.usluge = this.usluge.filter(usluga => usluga.boolean).map(usluga => usluga.Usluga);
    if(this.renovation.usluge.length == 0){
      this.error = "Morate izabrati usluge firme!";
      return;
    }
    this.renovation.firm = this.firm.name;
    this.renovation.now = new Date();
    this.renovation.username = this.user.username;
    this.renovation.status = "waiting";
    this.ownerService.addRenovation(this.renovation).subscribe((data:any)=>{
      if(data == "ok"){
        alert("Uspesno ste zakazali renoviranje baste!");
        this.ngOnInit();
      }
     })
  }

  addGrass(x: number, y: number) {
    var c = <HTMLCanvasElement>document.getElementById("garden");
    var ctx = c.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = "lightgreen";
      ctx.rect(x, y, 50, 50);
      ctx.fill();
      ctx.stroke();
    }
  }

  addPool(x: number, y: number, width: number, height: number) {
    var c = <HTMLCanvasElement>document.getElementById("garden");
    var ctx = c.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.rect(x, y, width, height);
      ctx.fill();
      ctx.stroke();
    }
  }

  addFountain(x: number, y: number) {
    var c = <HTMLCanvasElement>document.getElementById("garden");
    var ctx = c.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.arc(x, y, 70, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }

  addTables(x: number, y: number) {
    var c = <HTMLCanvasElement>document.getElementById("garden");
    var ctx = c.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = "brown";
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }

  addChairs(x: number, y: number) {
    var c = <HTMLCanvasElement>document.getElementById("garden");
    var ctx = c.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = "grey";
      ctx.rect(x, y, 50, 90);
      ctx.fill();
      ctx.stroke();
    }
  }

  jsonInput(event: any) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e: any) => {
      const { grass, pool, fountain, tables, chairs } = JSON.parse(e.target.result)
      //this.rest.layout = JSON.stringify(JSON.parse(e.target.result))
      const c = <HTMLCanvasElement>document.getElementById("garden");
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, c.width, c.height);
      }
      // if(this.renovation.tables != tables.length || this.renovation.chairs != chairs.length){
      //   this.error = "Unete vrednosti se ne poklapaju sa ucitanim JSON fajlom!";
      //   return;
      // }
      for (let g of grass) {
        this.addGrass(g.x, g.y);
      }
      for (let p of pool) {
        this.addPool(p.x, p.y, p.width, p.height);
      }
      for (let f of fountain) {
        this.addFountain(f.x, f.y);
      }
      for (let t of tables) {
        this.addTables(t.x, t.y);
      }
      for (let c of chairs) {
        this.addChairs(c.x, c.y);
      }
    }
    reader.readAsText(file)
  }
}
