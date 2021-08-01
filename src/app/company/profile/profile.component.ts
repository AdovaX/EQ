import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ContractorService } from '../../Services/contractor.service';
import { Contractor } from '../../class/Contractor';
import {SharedService} from '../../Services/shared.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData = new Contractor();
  User_id = sessionStorage.getItem('USER_ID');  
  Company_id = sessionStorage.getItem('COMPANY_ID'); 
  User_email ="";
  User_phone :number;
  User_designation="";
  User_firstName="";
  User_secondName=""; 
  Company_name="";
  submitted = false;
  isUpdated = false;
  invalid = false;
  updateUserForm: FormGroup;
  
    constructor(private ContractorService:ContractorService,private formBuilder: FormBuilder , private SharedService : SharedService) { 
      this.User_id = sessionStorage.getItem('USER_ID');  
    }
  
    
    User_firstName_Crl = new FormControl('', [ Validators.required, Validators.minLength(2)]);
    User_secondName_Crl = new FormControl('', [ Validators.required, Validators.minLength(2)]);
    User_phone_Crl = new FormControl('', [ Validators.required, Validators.minLength(10)]);
    User_email_Crl =new FormControl('', [ Validators.required, Validators.email]);
    User_designation_Crl = new FormControl('', [ Validators.required, Validators.minLength(2)]);
   
    ngOnInit(): void {
      this.updateUserForm = this.formBuilder.group({
        User_firstName_Crl : this.User_firstName_Crl,
        User_secondName_Crl : this.User_secondName_Crl,
        User_phone_Crl : this.User_phone_Crl,
        User_email_Crl : this.User_email_Crl, 
        User_designation_Crl : this.User_designation_Crl,  
    
      });  
       this.getProfileData(this.User_id); 
       console.log("Compnay"+this.Company_id);
  
     }
     get f() { return this.updateUserForm.controls; }
  
     onSubmit(){
       this.submitted = true;
   
      if (this.updateUserForm.invalid) {  
        return;
      }else{
        this.SharedService.updateUserProfile(this.User_id , this.updateUserForm.value).subscribe(data =>{
          console.log(data);
           if(data['status'] == "Failed"){
            this.invalid = true;
          }else{
            this.invalid = false;
            this.isUpdated = true; 
          }
          this.getProfileData(this.User_id);  
        }); 
      }  
     }
  
    getProfileData(id){
       var User_id = id;
       this.SharedService.getProfileData(User_id).subscribe(data =>{
         console.log(data); 
        let companyData =data['CompanyTb'];
        let userData =data;  
        console.log("Name is :" + userData['User_firstname']);
   
        this.Company_name = companyData.C_short_name;
        this.updateUserForm.controls.User_email_Crl.setValue(userData['User_email']);
        this.updateUserForm.controls.User_phone_Crl.setValue(userData['User_phonenumber']);
        this.updateUserForm.controls.User_firstName_Crl.setValue(userData['User_firstname']);
        this.updateUserForm.controls.User_secondName_Crl.setValue(userData['User_secondname']);
        this.updateUserForm.controls.User_designation_Crl.setValue(userData['User_designation']);
        this.User_designation = userData['User_designation'];
        this.User_firstName = userData['User_firstName'];
        this.User_secondName = userData['User_secondName'];
   
        });
    }
  
  }
  