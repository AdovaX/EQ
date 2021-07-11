import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LhManagerService } from '../../Services/lh-manager.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private LhManagerService:LhManagerService , private router:Router) {
    
    if(sessionStorage.getItem("ROLE_ID") == "5"){ 
      this.router.navigate(['L3Dashboard/Listingmanager']);  
     }else if(sessionStorage.getItem("ROLE_ID") == "6"){
      this.router.navigate(['L3Dashboard/Hiringmanager']);  
     }else{
      this.router.navigate(['/']); 
     } 
   } 
  ngOnInit(): void {
   
 
}
}
