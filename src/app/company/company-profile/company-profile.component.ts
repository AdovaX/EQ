import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ContractorService } from '../../Services/contractor.service';
import {SharedService} from '../../Services/shared.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  Contractor_id = sessionStorage.getItem('CONTRACTOR_ID');  
  Company_Form: FormGroup;
  submitted = false;
  isUpdated = false;
  invalid = false;
  Company_id:number;
  constructor(private formBuilder: FormBuilder, private ContractorService:ContractorService , private SharedService:SharedService) { }

  Company_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Company_shortname = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Company_noemployees = new FormControl('', [ Validators.required]);
  Company_email =new FormControl('', [ Validators.required, Validators.email]);
  Company_found = new FormControl('',);
  Company_website = new FormControl('', [ Validators.required,Validators.minLength(3)]);
  Company_about = new FormControl('',);
  ngOnInit(): void {
    this.Company_Form = this.formBuilder.group({
      Company_fullname : this.Company_fullname,
      Company_shortname : this.Company_shortname,
      Company_noemployees : this.Company_noemployees,
      Company_email : this.Company_email, 
      Company_found : this.Company_found,  
      Company_website : this.Company_website,  
      Company_about : this.Company_about,  
  
    });
    this.getCompanyData(this.Contractor_id);
  }  
  get f() { return this.Company_Form.controls; }

  resetForm(){ this.Company_Form.reset();}
  
  getCompanyData(id){
    var Contractor_id = id;
    this.SharedService.getProfileData(Contractor_id).subscribe(data =>{
     console.log(data);  
     this.Company_Form.controls.Company_fullname.setValue(data[0]['CompanyTb'].C_full_name);
     this.Company_Form.controls.Company_shortname.setValue(data[0]['CompanyTb'].C_short_name);
     this.Company_Form.controls.Company_noemployees.setValue(data[0]['CompanyTb'].No_employees);
     this.Company_Form.controls.Company_email.setValue(data[0]['CompanyTb'].Company_email);
     this.Company_Form.controls.Company_found.setValue(data[0]['CompanyTb'].Founded);
     this.Company_Form.controls.Company_website.setValue(data[0]['CompanyTb'].Website);
     this.Company_Form.controls.Company_about.setValue(data[0]['CompanyTb'].About);
     this.Company_id = data[0]['CompanyTb'].Company_id;

      
     
     });
 }
 onSubmit(){
  this.submitted = true;
  console.log(this.Company_Form.value);

 if (this.Company_Form.invalid) {  
   return;
 }else{
   this.ContractorService.updateCompany(this.Contractor_id ,this.Company_id, this.Company_Form.value).subscribe(data =>{
     console.log(data);
      if(data['status'] == "Failed"){
       this.invalid = true;
     }else{
       this.invalid = false;
       this.isUpdated = true; 
     }
     this.getCompanyData(this.Contractor_id);  
   }); 
 }  
}
}
