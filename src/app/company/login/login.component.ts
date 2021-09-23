import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../Services/company.service';
import { User } from '../../class/User';
import {Router} from "@angular/router"
import {ChatServiceService} from '../../Services/chat-service.service';

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

  constructor(private CompanyService:CompanyService,private formBuilder: FormBuilder,private router:Router,private ChatServiceService:ChatServiceService ) { 
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
 
  });
  }
  onSubmit() {    
    if (this.loginForm.invalid) {
      
    }else{
 
       var loginData = new User(); 
       loginData.User_email = this.loginForm.value.User_email;
       loginData.User_password = this.loginForm.value.User_password; 
       console.log(loginData);
       
       this.CompanyService.companyLogin(loginData).subscribe( data => {
         console.log(data);
         if(data['status']){
           this.loginstatus=true;
           return;
         }

         if(data[0].User_roles_id < 7){
          
         console.log("-------");
          console.log(data);
          this.user_id = data[0]['User_id'];
          this.company_id = data[0]['Company_id'];
          this.role_id = data[0]['User_roles_id']; 
          this.ChatServiceService.startRoom(this.user_id); 
          if(this.role_id){
            sessionStorage.setItem('USER_ID',String(this.user_id)); 
            sessionStorage.setItem("ROLE_ID", String(this.role_id)); 
            sessionStorage.setItem("COMPANY_ID", String(this.company_id));  
            console.log(this.company_id); 
            this.router.navigate(['company/Dashboard']); 

          } 
          else{
            this.loginstatus = true;
          }  

        }else{

          console.log("-------");
          console.log(data);
          this.user_id = data[0]['Resource_id'];
          this.company_id = data[0]['Company_id'];
          this.role_id = 7; 
          if(this.role_id){
            sessionStorage.setItem('RESOURCE_ID',String(this.user_id)); 
            sessionStorage.setItem("ROLE_ID", String(this.role_id)); 
            sessionStorage.setItem("COMPANY_ID", String(this.company_id)); 
            console.log(this.company_id);
            this.router.navigate(['company/Edit/']); 

          } 
          else{
            this.loginstatus = true;
          } 

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
