import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {DelegateService} from '../../Services/delegate.service';

@Component({
  selector: 'app-delegate-profile',
  templateUrl: './delegate-profile.component.html',
  styleUrls: ['./delegate-profile.component.css']
})
export class DelegateProfileComponent implements OnInit {
  User_id = sessionStorage.getItem('USER_ID');  
  Delegate_Form: FormGroup;
  submitted = false;
  isUpdated = false;
  invalid = false;
  Company_id:number;
  Company_name:string = "";
  Designation:string = "";
  Delegate_name:string = "";
  constructor(private formBuilder: FormBuilder, private DelegateService:DelegateService) { }

  Delegate_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  User_email = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Delegate_designation = new FormControl('', [ Validators.required]);
  Delegate_phone =new FormControl('', [ Validators.required]); 
  ngOnInit(): void {
    this.Delegate_Form = this.formBuilder.group({
      Delegate_fullname : this.Delegate_fullname, 
      User_email : this.User_email, 
      Delegate_designation : this.Delegate_designation, 
      Delegate_phone : this.Delegate_phone, 
  
    });
    this.getCompanyData(this.User_id);
  }

  getCompanyData(id){
    var User_id = id;
    this.DelegateService.getProfileData(User_id).subscribe(data =>{
     console.log(data);
        var userData =data[0];
        var delegateData =data[0]['DelegateTb'];
        var companyData =data[0]['DelegateTb']['CompanyTb'];
        sessionStorage.setItem("DELEGATE_ID" , String(delegateData.Delegate_id));
        console.log("=="+delegateData.Delegate_id+"==");

     this.Company_name = companyData.C_short_name;
     this.Designation = delegateData.Delegate_designation;

     this.Delegate_Form.controls.Delegate_fullname.setValue(delegateData.Delegate_name);
     this.Delegate_Form.controls.User_email.setValue(userData.User_email);
     this.Delegate_Form.controls.Delegate_designation.setValue(delegateData.Delegate_designation);
     this.Delegate_Form.controls.Delegate_phone.setValue(delegateData.Delegate_phone);  
     this.Delegate_name = delegateData.Delegate_name;

     });  
 }

 onSubmit(){
  this.submitted = true;  
 if (this.Delegate_Form.invalid) {   
   return;
 }else{
   this.DelegateService.updateDelegate(this.User_id, this.Delegate_Form.value).subscribe(data =>{
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

get f() { return this.Delegate_Form.controls; }

resetForm(){ this.Delegate_Form.reset();}

}
