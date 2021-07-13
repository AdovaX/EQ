import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {HiringManagerService} from '../../Services/hiring-manager.service';

@Component({
  selector: 'app-h-manager-profile',
  templateUrl: './h-manager-profile.component.html',
  styleUrls: ['./h-manager-profile.component.css']
})
export class HManagerProfileComponent implements OnInit {
  HManager_id = sessionStorage.getItem('HM_ID');  
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
  HManager_email = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  HManager_designation = new FormControl('', [ Validators.required]);
  HManager_phone =new FormControl('', [ Validators.required]); 
  ngOnInit(): void {
    this.HManager_Form = this.formBuilder.group({
      HManager_fullname : this.HManager_fullname, 
      HManager_email : this.HManager_email, 
      HManager_designation : this.HManager_designation, 
      HManager_phone : this.HManager_phone, 
  
    });
    this.getCompanyData(this.HManager_id);
  }

  getCompanyData(id){
    var HManager_id = id;
     this.HiringManagerService.getProfileData(HManager_id).subscribe(data =>{
     console.log(data);  
     this.Company_name = data[0]['CompanyTb'].C_full_name;
     this.Designation = data[0]['HManager_designation'];

     this.HManager_Form.controls.HManager_fullname.setValue(data[0]['HManager_name']);
     this.HManager_Form.controls.HManager_email.setValue(data[0]['HManager_email']);
     this.HManager_Form.controls.HManager_designation.setValue(data[0]['HManager_designation']);
     this.HManager_Form.controls.HManager_phone.setValue(data[0]['HManager_phone']);  
     
     this.HManager_name = data[0]['HManager_name'];
     });  
 }

 onSubmit(){
  this.submitted = true;  
 if (this.HManager_Form.invalid) {   
   return;
 }else{
   this.HiringManagerService.updateLManagerProfile(this.HManager_Form.value).subscribe(data =>{
      if(data['status'] == "Failed"){
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
