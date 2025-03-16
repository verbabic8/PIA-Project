import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private loginService: LoginService) { }

  user: User = new User();
  error: string="";
  cardType: string = "";
  cardPicture: string = "";

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

  getCardType(cardNumber: string): string{
    const regexDiners = /^(300|301|302|303|36|38)/;
    const regexMaster = /^5[1-5]/;
    const regexVisa = /^(4539|4556|4916|4532|4929|4485|4716)/;

    if (regexDiners.test(cardNumber)) {
        return 'diners';
    } else if (regexMaster.test(cardNumber)) {
        return 'mastercard';
    } else if (regexVisa.test(cardNumber)) {
        return 'visa';
    } else {
        return 'unknown';
    }
  }

  onCardInputChange(event: any) {
    const cardNumber = event.target.value.replace(/[- ]/g, '');
    this.cardType = this.getCardType(cardNumber);
  }

  register(){
    if(this.user.username == "" || this.user.password == "" || this.user.firstname == "" || this.user.lastname == "" 
      || this.user.email == "" || this.user.card == "" || this.user.phone == "" ||  this.user.gender == "" || this.user.address == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }
     var regexPassword = /^(?=[A-Za-z])(?=.*[A-Z])(?=(.*[a-z]){3,})(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,10}$/;
     var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     var regexCard = /^(?:\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}|\d{3}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}|\d{15}|\d{16})$/;

     if(!regexPassword.test(this.user.password)){
      this.error = "Lozinka ne ispunjava odgovarajuci oblik! (6<=password<=10, 1 veliko slovo, 3 mala, 1 broj, 1 specijalni karakter i mora pocinjati slovom)!";
      return;
     }
     if(!regexEmail.test(this.user.email)){
      this.error = "Email ne ispunjava odgovarajuci oblik!";
      return;
     }
     if(!regexCard.test(this.user.card)){
      this.error = "Kartica mora biti oblika XXXX XXXX XXXX XXXX ili XXXX-XXXX-XXXX-XXXX!";
      return;
     }
     const card = this.getCardType(this.user.card.replace(/[- ]/g, ''));
     if(card == 'unknown'){
      this.error = "Kartica nije podrzana!";
      return;
     }
     this.user.type = "owner";
     this.loginService.register(this.user).subscribe((data:any)=>{
      if(data == "error"){
        this.error = "Korisnicko ime ili email vec postoje!"
        return;
      }
      if(data == "ok"){
        alert("Uspesno ste se registrovali!");
        this.router.navigate(['']);
      }
     })
  }
}
