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
  Contractor_email = new FormControl('', [ Validators.required, Validators.email]);
  Contractor_password = new FormControl('', [ Validators.required, Validators.minLength(4)]);
  Contract_password2 = new FormControl('', [ Validators.required, Validators.minLength(4)]);
  No_employees = new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$")]);
  Website = new FormControl('', [ Validators.required]);
  Contract_designation = new FormControl('', [ Validators.required,]);
  Contract_phone = new FormControl('', [ Validators.required]);
 

  ngOnInit(): void {
  //this.company_list(); 
  this.registerForm = this.formBuilder.group({
    C_full_name : this.C_full_name,
    C_short_name : this.C_short_name,
    Contractor_email : this.Contractor_email,
    Contractor_password : this.Contractor_password, 
    Contract_password2 : this.Contract_password2, 
    No_employees : this.No_employees,
    Website : this.Website,
    Contract_designation : this.Contract_designation,
    Contract_phone : this.Contract_phone, 


  },);
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`); 
  this.disabled = false;
  }
 
  onSubmit() {
    this.submitted = true;    
    if (this.registerForm.invalid) { 
 
    }else if(this.registerForm.value.Contractor_password !==this.registerForm.value.Contract_password2){
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
      contractorData.Contractor_email = this.registerForm.value.Contractor_email;
      contractorData.Contractor_password = this.registerForm.value.Contractor_password;
      contractorData.Contract_designation = this.registerForm.value.Contract_designation;
      contractorData.Contract_phone = this.registerForm.value.Contract_phone;
        
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
