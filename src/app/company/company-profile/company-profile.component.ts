import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ContractorService } from '../../Services/contractor.service';
import {SharedService} from '../../Services/shared.service';
import { CompanyService } from '../../Services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  User_id = sessionStorage.getItem('USER_ID');  
  Company_Form: FormGroup;
  Branch_Form:FormGroup;
  Bank_Form:FormGroup;
  Government_Form:FormGroup;
  Preferences_Form:FormGroup;
  submitted = false;
  branchAdded = false;
  isUpdated = false;
  invalid = false;
  hasBranch = false;
  govUpdated=false;
  branch_List =[];
  gov_Ids =[];
  bankAdded = false;
  hasBank =false;
  hasGov=false;
  bank_List=[];
  isMasked = 0;
  isFreelancer = 0;
  isTier  = new Array(); 
  tierList  = new Array(); 

  ispreferenceUpdated = false;
  companyTiers:any;
  Options:any;
  Company_id=sessionStorage.getItem('COMPANY_ID');
  constructor(private formBuilder: FormBuilder, private ContractorService:ContractorService ,private CompanyService:CompanyService, private SharedService:SharedService) { }

  Company_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Company_shortname = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Company_noemployees = new FormControl('', [ Validators.required]);
  Company_email =new FormControl('', [ Validators.required, Validators.email]);
  Company_found = new FormControl('',);
  Company_website = new FormControl('', [ Validators.required,Validators.minLength(3)]);
  Company_about = new FormControl('',);
  Company_city = new FormControl('', [ Validators.required,Validators.minLength(3)]);
  Company_city_address = new FormControl('', [ Validators.required,Validators.minLength(3)]);
  Company_gmap = new FormControl('',);
  Bank_name = new FormControl('', [ Validators.required]);
  Bank_Branch = new FormControl('', [ Validators.required]);
  Company_state = new FormControl('', [ Validators.required]);
  Company_GSTIN = new FormControl('', );
  Bank_address = new FormControl('', [ Validators.required]);
  Bank_accountNumber = new FormControl('', [ Validators.required]);
  Bank_accountNumber2 = new FormControl('', [ Validators.required]);
  Bank_IFSC = new FormControl('', [ Validators.required]);
  Enable_masking = new FormControl('', [ Validators.required]);
  Enable_freelancers = new FormControl('', [ Validators.required]);
  Company_tiers = new FormControl('', [ Validators.required]);
  Company_TAN = new FormControl('', );
  Company_CIN = new FormControl('', );
  Company_PAN = new FormControl('', );
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
    this.Branch_Form = this.formBuilder.group({
      Company_city : this.Company_city,
      Company_city_address : this.Company_city_address,
      Company_gmap : this.Company_gmap,  
      Company_state : this.Company_state,  
      Company_GSTIN:this.Company_GSTIN
  
    });
    this.Government_Form = this.formBuilder.group({
      Company_TAN : this.Company_TAN,
      Company_CIN : this.Company_CIN,
      Company_PAN : this.Company_PAN, 
  
    });
    this.Bank_Form = this.formBuilder.group({
      Bank_name : this.Bank_name,
      Bank_Branch : this.Bank_Branch,
      Bank_address : this.Bank_address,  
      Bank_accountNumber : this.Bank_accountNumber,  
      Bank_accountNumber2 : this.Bank_accountNumber2,  
      Bank_IFSC : this.Bank_IFSC,  
  
    }); 
    this.Preferences_Form = this.formBuilder.group({
      Enable_masking : this.Enable_masking,
      Enable_freelancers : this.Enable_freelancers,
      Company_tiers : this.Company_tiers,  
  
    });
    this.companyTiers = [
      { id: 1, name: 'Tier 1' },
      { id: 2, name: 'Tier 2' },
      { id: 3, name: 'Tier 3' },
      { id: 4, name: 'Tier 4' },
      { id: 5, name: 'Tier 5' }
    ];
    this.Options=[

      { id: 1, name: 'Yes' }, 
      { id: 0, name: 'No' }, 
    ];
    this.getCompanyData(this.User_id);
    this.getBranches();
    this.getBanks();
    this.getPreferences();
    this.getGovernmentData();
  }  
  get f() { return this.Company_Form.controls; }
  get b() { return this.Branch_Form.controls; }
  get bank() { return this.Bank_Form.controls; }

  resetForm(){ this.Company_Form.reset();}
  resetBranchForm(){ this.Branch_Form.reset();}
  resetBankForm(){ this.Bank_Form.reset();}
  resetGovForm(){ this.Government_Form.reset();}
  
  getCompanyData(id){
    var User_id = id;
    this.SharedService.getProfileData(User_id).subscribe(data =>{
     console.log(data);  
     this.Company_Form.controls.Company_fullname.setValue(data['CompanyTb'].C_full_name);
     this.Company_Form.controls.Company_shortname.setValue(data['CompanyTb'].C_short_name);
     this.Company_Form.controls.Company_noemployees.setValue(data['CompanyTb'].No_employees);
     this.Company_Form.controls.Company_email.setValue(data['CompanyTb'].Company_email);
     this.Company_Form.controls.Company_found.setValue(data['CompanyTb'].Founded);
     this.Company_Form.controls.Company_website.setValue(data['CompanyTb'].Website);
     this.Company_Form.controls.Company_about.setValue(data['CompanyTb'].About);
     this.Company_id = data['CompanyTb'].Company_id;

      
     
     });
 }
 onSubmit(){
  this.submitted = true;
  console.log(this.Company_Form.value);

 if (this.Company_Form.invalid) {  
   return;
 }else{
   this.ContractorService.updateCompany(this.User_id ,this.Company_id, this.Company_Form.value).subscribe(data =>{
     console.log(data);
      if(data['status'] == "Failed"){
       this.invalid = true;
     }else{
       this.invalid = false;
       this.isUpdated = true; 
     }
     this.getCompanyData(this.User_id);  
   }); 
 }  
}
addBranch(){
  if(this.Branch_Form.invalid){
    this.branchAdded =false;
    return false;
  }else{
    this.CompanyService.addBranches(this.User_id ,this.Company_id, this.Branch_Form.value).subscribe(data =>{
      console.log(data);
       if(data['status'] == "Failed"){ 
         alert("Invalid details!");
      }else{ 
        this.branchAdded =true;
      }
      this.Branch_Form.reset();
      this.getBranches();  
    });

  } 
}
getBranches(){
  this.CompanyService.getBranches(this.Company_id).subscribe(data =>{
    console.log(data);
     if(data['status'] == "Failed"){ 
       
    }else{ 
      this.hasBranch=true;
      this.branch_List = data;
       
    }   
  });

}
addBank(){
  if(this.Bank_Form.invalid){
    this.bankAdded =false;
    return false;
  }else if(this.Bank_Form.value.Bank_accountNumber != this.Bank_Form.value.Bank_accountNumber2){
    alert("Account number mismatch");
  }
  else{
    this.CompanyService.addBankAccount(this.User_id ,this.Company_id, this.Bank_Form.value).subscribe(data =>{
      console.log(data);
       if(data['status'] == "Failed"){ 
         alert("Invalid details!");
      }else{ 
        this.bankAdded =true;
      }
      this.Bank_Form.reset();
      this.getBanks();  
    });

  }  
}
getBanks(){
  this.CompanyService.getBanks(this.Company_id).subscribe(data =>{
    console.log(data);
     if(data['status'] == "Failed"){ 
       
    }else{ 
      this.hasBank=true;
      this.bank_List = data; 
    }   
  }); 
}
UpdatePreferences(){
   
  let data = {
    "Enable_masking" : this.isMasked,
    "Enable_freelancers" : this.isFreelancer,
    "Company_tiers" : this.isTier

  }
   this.CompanyService.upddatePreferences(this.User_id ,this.Company_id, data).subscribe(data =>{
      console.log(data);
       if(data['status'] == "Failed"){ 
         alert("Invalid details!");
      }else{ 
        this.ispreferenceUpdated =true;
      }  
    });
    
}
getPreferences(){
  this.CompanyService.getPreferences(this.Company_id).subscribe(data =>{

    this.isMasked = data['Enable_masking'];
    this.isFreelancer = data['Freelancers']
    this.isTier = JSON.parse(data['Tiers_maching']);
    console.log((this.isTier));
    
  }); 
}
doesExist(tier: string): boolean {
   let r =JSON.stringify(this.isTier);
  return r.includes(tier);
  }

changeMasking(e){
  this.isMasked=e.target.value;  
}
changeFreelancer(e){
  this.isFreelancer=e.target.value;  
}
changeTierList(e){ 

  if(e.target.checked){
    this.isTier.push(e.target.value); 

  }else{

    this.isTier = this.isTier.filter(m=>m!==e.target.value);
  }       
  console.log(this.isTier); 
 

}

addGovernmentIds(){
  
    this.CompanyService.addGovernmentData(this.User_id ,this.Company_id, this.Government_Form.value).subscribe(data =>{
      console.log(data);
       if(data['status'] == "Failed"){ 
         alert("Invalid details!");
      }else{ 
        this.govUpdated =true;
      }
      this.Government_Form.reset(); 
      this.getGovernmentData();
    });
 
}
getGovernmentData(){
  this.CompanyService.getGovernmentData(this.Company_id).subscribe(data =>{
    console.log(data);
    if(data['status'] == "Failed"){ 
       
    }else{ 
      this.hasGov=true;
      this.gov_Ids = data; 
    } 
    
  }); 
}
}
