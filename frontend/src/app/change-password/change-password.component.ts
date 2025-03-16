import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/User';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private router: Router, private loginService: LoginService) { }

  oldPassword: string="";
  newPassword1: string="";
  newPassword2: string="";
  error: string="";
  username: string="";

  ngOnInit(){}

  changePassword(){
    var regexPassword = /^(?=[A-Za-z])(?=.*[A-Z])(?=(.*[a-z]){3,})(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,10}$/;
    if(this.oldPassword=="" || this.newPassword1=="" || this.newPassword2==""){
      this.error="Niste popunili sva polja!";
      return;
    }
    if(this.newPassword1 != this.newPassword2){
      this.error = "Nova i ponovljena lozinka se ne podudaraju!";
      return;
    }
    if(!regexPassword.test(this.newPassword1)){
      this.error = "Lozinka ne ispunjava odgovarajuci oblik! (6<=password<=10, 1 veliko slovo, 3 mala, 1 broj, 1 specijalni karakter i mora pocinjati slovom)!";
      return;
    }
    this.loginService.changePassword(this.username, this.oldPassword, this.newPassword1).subscribe((data:any)=>{
      if(data == "ok"){
        alert("Uspesno promenjena lozinka!");
        this.router.navigate(['']);
      }
      else{
        this.error ="Netacna loznka!";
      }
    })
  }
}
