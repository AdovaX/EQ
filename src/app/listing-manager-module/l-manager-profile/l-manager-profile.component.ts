import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ListingManagerService} from '../../Services/listing-manager.service';

@Component({
  selector: 'app-l-manager-profile',
  templateUrl: './l-manager-profile.component.html',
  styleUrls: ['./l-manager-profile.component.css']
})
export class LManagerProfileComponent implements OnInit {
  LManager_id = sessionStorage.getItem('USER_ID');  
  LManager_Form: FormGroup;
  submitted = false;
  isUpdated = false;
  invalid = false;
  Company_id:number;
  Company_name:string = "";
  Designation:string = "";
  LManager_name:string = "";
  constructor(private formBuilder: FormBuilder, private ListingManagerService:ListingManagerService) { }

  LManager_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  User_email = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  LManager_designation = new FormControl('', [ Validators.required]);
  LManager_phone =new FormControl('', [ Validators.required]); 
  ngOnInit(): void {
    this.LManager_Form = this.formBuilder.group({
      LManager_fullname : this.LManager_fullname, 
      User_email : this.User_email, 
      LManager_designation : this.LManager_designation, 
      LManager_phone : this.LManager_phone, 
  
    });
    this.getCompanyData(this.LManager_id);
  }

  getCompanyData(id){
    var LManager_id = id;
    this.ListingManagerService.getProfileData(LManager_id).subscribe(data =>{
     console.log(data);   
     var companyData= data[0]['ListingManagerTb']['CompanyTb'];
     var profileData = data[0]['ListingManagerTb'];
     var userData = data[0];

     this.Company_name = companyData['C_short_name'];
     this.Designation = profileData['LManager_designation'];
     sessionStorage.setItem("LM_ID" , String(profileData.LManager_id));

     this.LManager_Form.controls.LManager_fullname.setValue(profileData['LManager_name']);
     this.LManager_Form.controls.User_email.setValue(userData['User_email']);
     this.LManager_Form.controls.LManager_designation.setValue(profileData['LManager_designation']);
     this.LManager_Form.controls.LManager_phone.setValue(profileData['LManager_phone']);  
     this.LManager_name = profileData['LManager_name'];
     });  
 }

 onSubmit(){
  this.submitted = true;  
 if (this.LManager_Form.invalid) {   
   return;
 }else{
   this.ListingManagerService.updateLManagerProfile(this.LManager_Form.value).subscribe(data =>{
    if(!data){
      this.invalid = true;
    }else{
      this.invalid = false;
      this.isUpdated = true; 
    }
     this.getCompanyData(this.LManager_id);  
   }); 
 }  
}

get f() { return this.LManager_Form.controls; }

resetForm(){ this.LManager_Form.reset();}

}
