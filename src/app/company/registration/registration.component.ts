import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../Services/company.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Company } from '../../class/Company';
import { Contractor } from '../../class/Contractor'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false; 
  isRegistred= false;   
  fieldTextType: boolean;

  constructor(private CompanyService:CompanyService,private formBuilder: FormBuilder , private router:Router) { }
 
  Company: Company[];
  disabled= true;
  C_full_name = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  C_short_name = new FormControl('', [ Validators.required]);
  User_email = new FormControl('', [ Validators.required, Validators.email]);
  User_password = new FormControl('', [ Validators.required, Validators.minLength(4)]);
  User_password2 = new FormControl('', [ Validators.required, Validators.minLength(4)]);
  No_employees = new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$")]);
  Website = new FormControl('', [ Validators.required]);
  User_designation = new FormControl('', [ Validators.required,]);
  User_phone = new FormControl('', [ Validators.required]);
 

  ngOnInit(): void {
  //this.company_list(); 
  this.registerForm = this.formBuilder.group({
    C_full_name : this.C_full_name,
    C_short_name : this.C_short_name,
    User_email : this.User_email,
    User_password : this.User_password, 
    User_password2 : this.User_password2, 
    No_employees : this.No_employees,
    Website : this.Website,
    User_designation : this.User_designation,
    User_phone : this.User_phone, 


  },);
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`); 
  this.disabled = false;
  }
 
  onSubmit() {
    this.submitted = true;    
    if (this.registerForm.invalid) { 
 
    }else if(this.registerForm.value.User_password !==this.registerForm.value.User_password2){
      alert("Passwords do not match");
    }
    else{

      this.disabled = true; 
       var companyData = new Company();
      companyData.C_full_name = this.registerForm.value.C_full_name;
      companyData.C_short_name = this.registerForm.value.C_short_name;
      companyData.No_employees = this.registerForm.value.No_employees;
      companyData.Website = this.registerForm.value.Website; 

      var contractorData = new Contractor(); 
      contractorData.User_email = this.registerForm.value.User_email;
      contractorData.User_password = this.registerForm.value.User_password;
      contractorData.User_designation = this.registerForm.value.User_designation;
      contractorData.User_phone = this.registerForm.value.User_phone;
        
       this.CompanyService.insertCompany(companyData , contractorData).subscribe( data => {
         this.Company = data;
         console.log("-------");  
         this.isRegistred= true;

         setTimeout(() => {
          this.router.navigate(['company/Login']);
      }, 3000); 
        });
     
      
    }

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
    
}
