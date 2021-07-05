import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpocDelegateService } from '../../Services/spoc-delegate.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private SpocDelegateService:SpocDelegateService) { }

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
        }else if(data['status'] === "SPOC"){
          this.loginstatus = false; 
          alert("Spoc");

        }else if(data['status'] === "DELEGATE"){
          this.loginstatus = false; 
          alert("DELEGATE");
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
