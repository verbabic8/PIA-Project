import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent {
  constructor(private activeRoute: ActivatedRoute, private adminService: AdminService, private router: Router) { }

  user: User = new User();
  username: string="";
  error:string="";

  ngOnInit(){
    this.username = this.activeRoute.snapshot.paramMap.get('username') || '';
    this.getUser();
  }

  getUser(){
    this.adminService.getUser(this.username).subscribe((data: any) => {
      this.user = data;
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
          this.user.picture = reader.result as string;
        } else {
          alert("Slika mora biti izmedju  100x100px i 300x300px");
        }
      };
    };
  }

  update(){
    var regexPassword = /^(?=[A-Za-z])(?=.*[A-Z])(?=(.*[a-z]){3,})(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,10}$/;
    var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var regexCard = /^(?:\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}|\d{3}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}|\d{15}|\d{16})$/;

    // if(!regexPassword.test(this.user.password)){
    //   this.error = "Lozinka ne ispunjava odgovarajuci oblik! (6<=password<=10, 1 veliko slovo, 3 mala, 1 broj, 1 specijalni karakter i mora pocinjati slovom)!";
    //   return;
    // }
    if(!regexEmail.test(this.user.email)){
      this.error = "Email ne ispunjava odgovarajuci oblik!";
      return;
    }
    if(!regexCard.test(this.user.card)){
      this.error = "Kartica mora biti oblika XXXX XXXX XXXX XXXX ili XXXX-XXXX-XXXX-XXXX!";
      return;
    }
    this.adminService.update(this.user, this.username).subscribe((data:any)=>{
    if(data == "ok"){
      alert("Uspesno ste se azurirali korisnika!");
      //this.router.navigate(['']);
      }
    })
  }
}
