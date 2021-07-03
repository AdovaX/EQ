import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../Services/company.service';
import { Contractor } from '../../class/Contractor';
import {Router} from "@angular/router"
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  Contractor: Contractor[];
  loginstatus = false;

  constructor(private CompanyService:CompanyService,private formBuilder: FormBuilder,private router:Router ) { 

    sessionStorage.clear();
  }
  hide = true;

  ngOnInit(): void { 
    this.loginForm = this.formBuilder.group({ 
      Contractor_email :['', [Validators.required, Validators.email]],
      Contractor_password :['', [Validators.required,Validators.minLength(4)]],

  });
  }
  onSubmit() {    // stop here if form is invalid
    if (this.loginForm.invalid) {
      
    }else{
 
       var loginData = new Contractor(); 
       loginData.Contractor_email = this.loginForm.value.Contractor_email;
       loginData.Contractor_password = this.loginForm.value.Contractor_password;
       
       this.CompanyService.companyLogin(loginData).subscribe( data => {
          
         console.log("-------");
          console.log(data);
         if(typeof data === 'undefined'){
          this.loginstatus=true;
         }else if(data['status'] > 0)
         {
          sessionStorage.setItem("CONTRACTOR_ID", data['status']); 
          this.router.navigate(['company/Dashboard']);
         }
         else{  
           alert("Invalid Credential"); 
         }

       });
     
      
    }

  }

}
