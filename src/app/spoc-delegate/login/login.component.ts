import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder , private router:Router) {
     if(sessionStorage.getItem("ROLE_ID") == "3"){ 
      this.router.navigate(['L2Dashboard/Delegate']);  
     }else if(sessionStorage.getItem("ROLE_ID") == "4"){
      this.router.navigate(['L2Dashboard/Spoc']);  
     }else{
      this.router.navigate(['/']); 
     } 
   }
 

  ngOnInit(): void {
    
  }

  
  

}
