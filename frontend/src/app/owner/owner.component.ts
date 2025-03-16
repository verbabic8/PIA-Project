import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../services/owner.service';
import { User } from '../models/User';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent {
  constructor(private router: Router, private ownerService: OwnerService) {
    
  }

  user: User = new User();
  error: string="";

  ngOnInit(){let tmp = localStorage.getItem("ulogovan");
    if(tmp) this.user = JSON.parse(tmp);}

  update(){
    var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var regexCard = /\b\d{4}([- ])\d{4}\1\d{4}\1\d{4}\b/;
    if(!regexEmail.test(this.user.email)){
      this.error = "Email ne ispunjava odgovarajuci oblik!";
      return;
    }
    if(!regexCard.test(this.user.card)){
      this.error = "Kartica mora biti oblika XXXX XXXX XXXX XXXX ili XXXX-XXXX-XXXX-XXXX!";
      return;
    }
    this.error="";
    this.ownerService.update(this.user, this.user.username).subscribe((data:any)=>{
      if(data){
        alert("Uspesno ste se azurirali podatke!");
        localStorage.setItem("ulogovan", JSON.stringify(data));
        }
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
}
