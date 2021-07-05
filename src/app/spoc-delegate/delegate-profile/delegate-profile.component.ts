import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {DelegateService} from '../../Services/delegate.service';

@Component({
  selector: 'app-delegate-profile',
  templateUrl: './delegate-profile.component.html',
  styleUrls: ['./delegate-profile.component.css']
})
export class DelegateProfileComponent implements OnInit {
  Delegate_id = sessionStorage.getItem('DELEGATE_ID');  
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
  Delegate_email = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Delegate_designation = new FormControl('', [ Validators.required]);
  Delegate_phone =new FormControl('', [ Validators.required]); 
  ngOnInit(): void {
    this.Delegate_Form = this.formBuilder.group({
      Delegate_fullname : this.Delegate_fullname, 
      Delegate_email : this.Delegate_email, 
      Delegate_designation : this.Delegate_designation, 
      Delegate_phone : this.Delegate_phone, 
  
    });
    this.getCompanyData(this.Delegate_id);
  }

  getCompanyData(id){
    var Delegate_id = id;
    this.DelegateService.getProfileData(Delegate_id).subscribe(data =>{
     console.log(data);  
     this.Company_name = data[0]['CompanyTb'].C_full_name;
     this.Designation = data[0]['Delegate_designation'];

     this.Delegate_Form.controls.Delegate_fullname.setValue(data[0]['Delegate_name']);
     this.Delegate_Form.controls.Delegate_email.setValue(data[0]['Delegate_email']);
     this.Delegate_Form.controls.Delegate_designation.setValue(data[0]['Delegate_designation']);
     this.Delegate_Form.controls.Delegate_phone.setValue(data[0]['Delegate_phone']);  
     
     this.Delegate_name = data[0]['Delegate_name'];
     });  
 }

 onSubmit(){
  this.submitted = true;  
 if (this.Delegate_Form.invalid) {   
   return;
 }else{
   this.DelegateService.updateDelegate(this.Delegate_id, this.Delegate_Form.value).subscribe(data =>{
      if(data['status'] == "Failed"){
       this.invalid = true;
     }else{
       this.invalid = false;
       this.isUpdated = true; 
     }
     this.getCompanyData(this.Delegate_id);  
   }); 
 }  
}

get f() { return this.Delegate_Form.controls; }

resetForm(){ this.Delegate_Form.reset();}

}
