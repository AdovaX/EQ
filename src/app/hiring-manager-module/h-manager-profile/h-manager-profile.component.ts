import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {HiringManagerService} from '../../Services/hiring-manager.service';

@Component({
  selector: 'app-h-manager-profile',
  templateUrl: './h-manager-profile.component.html',
  styleUrls: ['./h-manager-profile.component.css']
})
export class HManagerProfileComponent implements OnInit {
  HManager_id = sessionStorage.getItem('USER_ID');  
  HManager_Form: FormGroup;
  submitted = false;
  isUpdated = false;
  invalid = false;
  Company_id:number;
  Company_name:string = "";
  Designation:string = "";
  HManager_name:string = "";
  constructor(private formBuilder: FormBuilder, private HiringManagerService:HiringManagerService) { }

  HManager_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  User_email = new FormControl('', [ Validators.required, Validators.email]);
  HManager_designation = new FormControl('', [ Validators.required]);
  HManager_phone =new FormControl('', [ Validators.required]); 
  ngOnInit(): void {
    this.HManager_Form = this.formBuilder.group({
      HManager_fullname : this.HManager_fullname, 
      User_email : this.User_email, 
      HManager_designation : this.HManager_designation, 
      HManager_phone : this.HManager_phone, 
  
    });
    this.getCompanyData(this.HManager_id);
  }

  getCompanyData(id){
    var HManager_id = id;
     this.HiringManagerService.getProfileData(HManager_id).subscribe(data =>{
     console.log(data);  
     var companyData= data[0]['HiringManagerTb']['CompanyTb'];
     var profileData = data[0]['HiringManagerTb'];
     var userData = data[0];

     this.Company_name = companyData['C_short_name'];
     this.Designation = profileData['HManager_designation'];
     sessionStorage.setItem("HM_ID" , String(profileData.HManager_id));

     this.HManager_Form.controls.HManager_fullname.setValue(profileData['HManager_name']);
     this.HManager_Form.controls.User_email.setValue(userData['User_email']);
     this.HManager_Form.controls.HManager_designation.setValue(profileData['HManager_designation']);
     this.HManager_Form.controls.HManager_phone.setValue(profileData['HManager_phone']);  
     
     this.HManager_name = profileData['HManager_name'];
     });  
 }

 onSubmit(){
  this.submitted = true;  
 if (this.HManager_Form.invalid) {   
   return;
 }else{
   this.HiringManagerService.updateLManagerProfile(this.HManager_Form.value).subscribe(data =>{
    if(!data){
      this.invalid = true;
    }else{
      this.invalid = false;
      this.isUpdated = true; 
    }
     this.getCompanyData(this.HManager_id);  
   }); 
 }  
}

get f() { return this.HManager_Form.controls; }

resetForm(){ this.HManager_Form.reset();}

}
