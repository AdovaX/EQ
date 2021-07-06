import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpocDelegateService } from '../../Services/spoc-delegate.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private SpocDelegateService:SpocDelegateService , private router:Router) {
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
      this.SpocDelegateService.spocDelegateLogin(this.loginForm.value).subscribe( data => {
          
        console.log("-------");
         console.log(data);
        if(typeof data === 'undefined'){
         this.loginstatus=true;
        }else if(data[0].status === "SPOC"){
          this.loginstatus = false; 
          sessionStorage.setItem("SPOC_ID", data[0].Spoc_id); 
          sessionStorage.setItem("COMPANY_ID", data[1]['CompanyTb'].Company_id);  
          console.log("session set Spoc :" + data[1].Spoc_id);
          console.log("COMPANY_ID : " +  data[1]['CompanyTb'].Company_id); 
          this.router.navigate(['manager/Spoc']); 

        }else if(data[0].status === "DELEGATE"){
          console.log("session set");
          this.loginstatus = false; 
          sessionStorage.setItem("DELEGATE_ID", data[0].Delegate_id); 
          sessionStorage.setItem("COMPANY_ID", data[1]['CompanyTb'].Company_id); 
          console.log("DELEGATE_ID : " + data[0].Delegate_id);
          console.log("COMPANY_ID : " +  data[1]['CompanyTb'].Company_id); 
          this.router.navigate(['manager/Delegate']); 
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
