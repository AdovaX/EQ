import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../Services/company.service';
import { User } from '../../class/User';
import {Router} from "@angular/router"
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  User: User[];
  loginstatus = false;
  fieldTextType: boolean;
  rolesList:[];
  user_id =0;
  role_id=0;
  company_id =0;

  constructor(private CompanyService:CompanyService,private formBuilder: FormBuilder,private router:Router ) { 
    sessionStorage.clear();
    localStorage.clear();

  }
  hide = true;

  ngOnInit(): void { 
    this.CompanyService.getRoles().subscribe( data => {
           console.log(data);
     this.rolesList = data; 
    });

    this.loginForm = this.formBuilder.group({ 
      User_email :['', [Validators.required, Validators.email]],
      User_password :['', [Validators.required,Validators.minLength(2)]],
      User_role :['', [Validators.required]],

  });
  }
  onSubmit() {    
    if (this.loginForm.invalid) {
      
    }else{
 
       var loginData = new User(); 
       loginData.User_email = this.loginForm.value.User_email;
       loginData.User_password = this.loginForm.value.User_password;
       loginData.User_role = this.loginForm.value.User_role;
       console.log(loginData);
       
       this.CompanyService.companyLogin(loginData).subscribe( data => {
         if(data['status']){
           this.loginstatus=true;
           return;
         }
          
         console.log("-------");
          console.log(data);
          this.user_id = data[0]['User_id'];
          this.company_id = data[0]['Company_id'];
          this.role_id = data[0]['User_roles_id'];
           //Contract owner
          if(this.role_id  == 2){
            sessionStorage.setItem('USER_ID',String(this.user_id)); 
            sessionStorage.setItem("ROLE_ID", String(this.role_id)); 
            sessionStorage.setItem("COMPANY_ID", String(this.company_id)); 
            console.log(this.company_id);
            this.router.navigate(['company/Dashboard']); 

          }//Delegate
          else if(this.role_id  == 3){
            sessionStorage.setItem('USER_ID',String(this.user_id)); 
            sessionStorage.setItem("ROLE_ID", String(this.role_id)); 
            sessionStorage.setItem("COMPANY_ID", String(this.company_id)); 
            this.router.navigate(['L2Dashboard']); 

          }//SPOC
          else if(this.role_id  == 4){
            sessionStorage.setItem('USER_ID',String(this.user_id)); 
            sessionStorage.setItem("ROLE_ID", String(this.role_id)); 
            sessionStorage.setItem("COMPANY_ID", String(this.company_id)); 
            this.router.navigate(['L3Dashboard']); 

          }//Listing
          else if(this.role_id  == 5){
            sessionStorage.setItem('USER_ID',String(this.user_id)); 
            sessionStorage.setItem("ROLE_ID", String(this.role_id)); 
            sessionStorage.setItem("COMPANY_ID", String(this.company_id)); 
            this.router.navigate(['L4Dashboard']); 

          }//Hiring
          else if(this.role_id  == 6){
            sessionStorage.setItem('USER_ID',String(this.user_id)); 
            sessionStorage.setItem("ROLE_ID", String(this.role_id)); 
            sessionStorage.setItem("COMPANY_ID", String(this.company_id)); 
            this.router.navigate(['L5Dashboard']); 

          }
          else{
            this.loginstatus = true;
          }  
       },
       err => {
         console.log(err);

       });
     
      
    }

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
