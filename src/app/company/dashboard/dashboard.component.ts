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
Contractor_id = sessionStorage.getItem('CONTRACTOR_ID');  
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
      console.log(data); 

      // this.Contractor_firstName = data[0].Contractor_firstName; 
      // this.Contractor_secondName = data[0].Contractor_secondName; 
      this.Contractor_designation = data[0].Contract_designation; 
      this.Contractor_email = data[0].Contractor_email;
      this.Contractor_phone = data[0].Contract_phone; 
      this.Company_name = data[0]['CompanyTb'].C_short_name;
      this.Company_id = data[0]['CompanyTb'].Company_id;
      sessionStorage.setItem("COMPANY_ID", this.Company_id); 
      
      if(this.Contractor_firstName !== null){
        this.Contractor_firstName = data[0].Contractor_firstName;
        this.updateContractorForm.patchValue({Contractor_firstName_Crl: this.Contractor_firstName}); 
       }
      if(this.Contractor_secondName !== null){
        this.Contractor_secondName = data[0].Contractor_secondName;  
        this.updateContractorForm.patchValue({Contractor_secondName_Crl: this.Contractor_secondName}); 
      } 
      if(this.Contractor_phone != null){
        this.Contractor_phone = data[0].Contract_phone;
        this.updateContractorForm.patchValue({Contract_phone_Crl: this.Contractor_phone}); 
      }
      if(this.Contractor_designation != null){
        this.Contractor_designation = data[0].Contract_designation;
        this.updateContractorForm.patchValue({Contract_designation_Crl: this.Contractor_designation}); 
      }
      if(this.Contractor_email != null){
        this.Contractor_email = data[0].Contractor_email;
        this.updateContractorForm.patchValue({Contractor_email_Crl: this.Contractor_email}); 
      } 
      
      });
  }

}
