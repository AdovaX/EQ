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
    sessionStorage.clear();
   }

  loginForm: FormGroup; 
  loginstatus = false;
  fieldTextType: boolean;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ 
      email :['', [Validators.required, Validators.email]],
      password :['', [Validators.required,Validators.minLength(2)]],
  });
  }

  onSubmit() { 
    if (this.loginForm.invalid) {
      return;
    }else{
      this.LhManagerService.LHManagerLogin(this.loginForm.value).subscribe( data => {
          
        console.log("-------");
         console.log(data);
        if(typeof data === 'undefined'){
         this.loginstatus=true;
        }else if(data[0].status === "LM_MANAGER"){
          this.loginstatus = false; 
          sessionStorage.setItem("LM_ID", data[0].LManager_id); 
          sessionStorage.setItem("COMPANY_ID", data[0].Company_id);  
          console.log("session set LManager :" + data[0].LManager_id);
          console.log("Company ID : " +  data[0].Company_id); 
          this.router.navigate(['listing/Listingmanager']); 

        }else if(data[0].status === "HM_MANAGER"){
          console.log("session set");
          this.loginstatus = false; 
          sessionStorage.setItem("HM_ID", data[0].HManager_id); 
          sessionStorage.setItem("COMPANY_ID", data[0].Company_id); 
          console.log("HM_ID : " + data[0].HManager_id);
          console.log("COMPANY_ID : " +  data[0].Company_id); 
          this.router.navigate(['listing/Hiringmanager']); 
         }
        else{  
          this.loginstatus = true;
        }

      }, 
        (error) => {   
          this.loginstatus = true;    
        }
        ); 
    }

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
