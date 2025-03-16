import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../models/User';
import { Firma } from '../models/Firma';
import { Usluga } from '../models/Usluga';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router: Router, private adminService: AdminService) { }

  users: User[] = [];
  decorator: User = new User();
  firm: Firma = new Firma();
  error: string="";
  name: string="";
  price: number=0;
  usluge: Usluga[] = [];
  decorators: User[] = [];
  workers: User[] = [];
  firms: Firma[] = [];


  ngOnInit(){
    this.getAllUsers();
    this.getFreeDecorators();
    this.getAllFirms();
  }

  getAllUsers(){
    this.adminService.getAllUsers().subscribe((data:any)=>{
      this.users = data;
    })
  }

  getAllFirms(){
    this.adminService.getAllFirms().subscribe((data:any)=>{
      this.firms = data;
    })
  }

  acceptProfile(username:string){
    this.adminService.acceptProfile(username).subscribe((data:any) => {
      this.ngOnInit()
    })  
  }
  declineProfile(username:string){
    this.adminService.declineProfile(username).subscribe((data:any) => {
      this.ngOnInit()
    })  
  }

  onFileSelected(event:any){
    const reader = new FileReader()
    const file: File = event.target.files[0]
    const fileType = file.type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      this.error = 'Samo JPEG ili PNG formati su dozvoljeni';
      return;
    }
    reader.readAsDataURL(file)
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = () => {
        if (image.width >= 100 && image.width <= 300 && image.height >= 100 && image.height <= 300) {
          this.decorator.picture = reader.result as string;
        } else {
          alert("Slika mora biti izmedju  100x100px i 300x300px");
        }
      };
    };
  }

  addDecorator(){
    if(this.decorator.username == "" || this.decorator.password == "" || this.decorator.firstname == "" || this.decorator.lastname == "" 
      || this.decorator.email == "" || this.decorator.card == "" || this.decorator.phone == "" ||  this.decorator.gender == "" || this.decorator.address == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }
     var regexPassword = /^(?=[A-Za-z])(?=.*[A-Z])(?=(.*[a-z]){3,})(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,10}$/;
     var regexDiners = /^(300|301|302|303|36|38)\d{11}$/;
     var regexMaster = /^5[1-5]\d{14}$/;
     var regexVisa = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
     var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     var regexCard = /^(\d{4} \d{4} \d{4} \d{4}|\d{16})$/;

     if(!regexPassword.test(this.decorator.password)){
      this.error = "Lozinka ne ispunjava odgovarajuci oblik! (6<=password<=10, 1 veliko slovo, 3 mala, 1 broj, 1 specijalni karakter i mora pocinjati slovom)!";
      return;
     }
     if(!regexEmail.test(this.decorator.email)){
      this.error = "Email ne ispunjava odgovarajuci oblik!";
      return;
     }
     if(!regexCard.test(this.decorator.card)){
      this.error = "Kartica mora biti oblika XXXX XXXX XXXX XXXX ili XXXXXXXXXXXXXXXX!";
      return;
     }
     this.decorator.type = "decorator";
     this.adminService.addDecorator(this.decorator).subscribe((data:any)=>{
      if(data == "error"){
        this.error = "Korisnicko ime ili email vec postoje!"
        return;
      }
      if(data == "ok"){
        alert("Uspesno ste dodali dekoratera!");
        this.decorator = new User();
      }
      this.ngOnInit();
    })
  }

  updateUser(username:string){
    this.router.navigate(['/admin/editUser', username]);
  }

  addFirm(){
    if(this.firm.name == "" || this.firm.address == "" || this.firm.firstname == "" || this.firm.lastname == "" 
      || this.firm.email == "" || this.firm.phone == "" || this.firm.start == null || this.firm.end == null) {
      this.error = "Niste uneli sve podatke!";
      return;
    }
    var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regexEmail.test(this.firm.email)){
      this.error = "Email ne ispunjava odgovarajuci oblik!";
      return;
    }
    if(this.workers.length < 2){
      this.error = "Morate zaposliti najmanje 2 dekoratera!";
      return;
    }
    if (new Date(this.firm.start).getTime() < new Date().getTime()) {
      this.error = "Ne mozete pocetak godisnjeg odmora staviti u proslosti!"
      return
    }
    if (new Date(this.firm.end).getTime() < new Date(this.firm.start).getTime()) {
      this.error = "Ne mozete pocetak i kraj godisnjeg okrenuti!"
      return
    }
    this.firm.usluge = this.usluge;
    this.firm.decorators = this.workers;
    this.usluge = [];
    this.workers = [];
    console.log(this.firm);
    this.adminService.addFirm(this.firm).subscribe((data:any)=>{
      if(data == "error"){
        this.error = "Firma sa tim imenom vec postoji!"
        return;
      }
      if(data == "ok"){
        alert("Uspesno ste dodali novu firmu!");
        this.firm = new Firma();
        this.ngOnInit();
      }
    })
  }

  addUsluga(){
    var newUsluga = new Usluga();
    newUsluga.name = this.name;
    newUsluga.price = this.price;
    this.usluge.push(newUsluga);
    this.name = '';
    this.price = 0;
  }

  getFreeDecorators(){
    this.adminService.getFreeDecorators().subscribe((data:any)=>{
      this.decorators = data;
    })
  }


  hire(user: User){
    user.haveFirm=true;
    this.workers.push(user);
    this.adminService.setWorking(user.username).subscribe((data:any)=>{
      this.getFreeDecorators();
    })
  }
}
