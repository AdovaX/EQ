import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ContractorService } from '../../Services/contractor.service';
import { Contractor } from '../../class/Contractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
profileData = new Contractor();
Contractor_id = sessionStorage.getItem('USER_ID');  
Company_id = "";
Contractor_email ="";
Contractor_phone :number;
Contractor_designation="";
Contractor_firstName="";
Contractor_secondName=""; 
Company_name="";
submitted = false;
isUpdated = false;
invalid = false;
updateContractorForm: FormGroup;

  constructor(private ContractorService:ContractorService,private formBuilder: FormBuilder) { }

  
  Contractor_firstName_Crl = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Contractor_secondName_Crl = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Contract_phone_Crl = new FormControl('', [ Validators.required, Validators.minLength(10)]);
  Contractor_email_Crl =new FormControl('', [ Validators.required, Validators.email]);
  Contract_designation_Crl = new FormControl('', [ Validators.required, Validators.minLength(2)]);
 
  ngOnInit(): void {
    this.updateContractorForm = this.formBuilder.group({
      Contractor_firstName_Crl : this.Contractor_firstName_Crl,
      Contractor_secondName_Crl : this.Contractor_secondName_Crl,
      Contract_phone_Crl : this.Contract_phone_Crl,
      Contractor_email_Crl : this.Contractor_email_Crl, 
      Contract_designation_Crl : this.Contract_designation_Crl,  
  
    });  
     this.getProfileData(this.Contractor_id); 
     console.log("Compnay"+this.Company_id);

   }
   get f() { return this.updateContractorForm.controls; }

   onSubmit(){
     this.submitted = true;
 
    if (this.updateContractorForm.invalid) {  
      return;
    }else{
      this.ContractorService.updateContractorProfile(this.Contractor_id , this.updateContractorForm.value).subscribe(data =>{
        console.log(data);
         if(data['status'] == "Failed"){
          this.invalid = true;
        }else{
          this.invalid = false;
          this.isUpdated = true; 
        }
        this.getProfileData(this.Contractor_id);  
      }); 
    }  
   }

  getProfileData(id){
     var Contractor_id = id;
     this.ContractorService.getProfileData(Contractor_id).subscribe(data =>{
      let profileData =data[0]['CompanyTb']['ContractOwnerTb'];
      let companyData =data[0]['CompanyTb'];
      let userData =data[0]; 
      sessionStorage.setItem("CONTRACTOR_ID",profileData.Contractor_id);
 
      this.Company_name = companyData.C_short_name;
      this.updateContractorForm.controls.Contractor_email_Crl.setValue(userData.User_email);
      this.updateContractorForm.controls.Contract_phone_Crl.setValue(profileData.Contract_phone);
      this.updateContractorForm.controls.Contractor_firstName_Crl.setValue(profileData.Contractor_firstName);
      this.updateContractorForm.controls.Contractor_secondName_Crl.setValue(profileData.Contractor_secondName);
      this.updateContractorForm.controls.Contract_designation_Crl.setValue(profileData.Contract_designation);
      this.Contractor_designation = profileData.Contract_designation;
      this.Contractor_firstName = profileData.Contractor_firstName;
      this.Contractor_secondName = profileData.Contractor_secondName;
 
      });
  }

}
