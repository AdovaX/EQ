import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ListingManagerService} from '../../Services/listing-manager.service';

@Component({
  selector: 'app-l-manager-profile',
  templateUrl: './l-manager-profile.component.html',
  styleUrls: ['./l-manager-profile.component.css']
})
export class LManagerProfileComponent implements OnInit {
  LManager_id = sessionStorage.getItem('LM_ID');  
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
  LManager_email = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  LManager_designation = new FormControl('', [ Validators.required]);
  LManager_phone =new FormControl('', [ Validators.required]); 
  ngOnInit(): void {
    this.LManager_Form = this.formBuilder.group({
      LManager_fullname : this.LManager_fullname, 
      LManager_email : this.LManager_email, 
      LManager_designation : this.LManager_designation, 
      LManager_phone : this.LManager_phone, 
  
    });
    this.getCompanyData(this.LManager_id);
  }

  getCompanyData(id){
    var LManager_id = id;
    this.ListingManagerService.getProfileData(LManager_id).subscribe(data =>{
     console.log(data);  
     this.Company_name = data[0]['CompanyTb'].C_full_name;
     this.Designation = data[0]['LManager_designation'];

     this.LManager_Form.controls.LManager_fullname.setValue(data[0]['LManager_name']);
     this.LManager_Form.controls.LManager_email.setValue(data[0]['LManager_email']);
     this.LManager_Form.controls.LManager_designation.setValue(data[0]['LManager_designation']);
     this.LManager_Form.controls.LManager_phone.setValue(data[0]['LManager_phone']);  
     
     this.LManager_name = data[0]['LManager_name'];
     });  
 }

 onSubmit(){
  this.submitted = true;  
 if (this.LManager_Form.invalid) {   
   return;
 }else{
   this.ListingManagerService.updateLManagerProfile(this.LManager_Form.value).subscribe(data =>{
      if(data['status'] == "Failed"){
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
