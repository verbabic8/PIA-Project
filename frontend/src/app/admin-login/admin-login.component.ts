import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private router: Router, private userService: LoginService) { }
  username: string = "";
  password: string = "";
  error: string = "";


  ngOnInit(): void {
  }

  loginAdmin() {
    if (this.username == "" || this.password == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";
    this.userService.loginAdmin(this.username, this.password).subscribe((k:any) => {
      if (k) {
        localStorage.setItem("ulogovan", JSON.stringify(k))
        this.router.navigate(['/admin'])
      } else {
        this.error = "Losi podaci!";
        return;
      }
    })
  }
}
