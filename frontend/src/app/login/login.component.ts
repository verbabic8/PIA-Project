import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private loginService: LoginService) { }
  
  username: string = "";
  password: string = "";
  error: string = "";

  ngOnInit(): void {
  }

  login() {
    if (this.username == "" || this.password == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";
    this.loginService.login(this.username, this.password).subscribe((data:any) => {
      if (data) {
        if(data.state == "waiting"){
          this.error="Administrator nije potvrdio vas nalog!";
          return;
        }
        if(data == "admin"){
          this.error = "Losi podaci!";
          return;
        }
        if(data == "declined"){
          this.error = "Vas nalog je odbijen!";
          return;
        }
        localStorage.setItem("ulogovan", JSON.stringify(data));
        this.router.navigate([data.type])
      } else {
        this.error = "Losi podaci!";
        return;
      }
    })
  }
}
