import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {SpocService} from '../../Services/spoc.service';
@Component({
  selector: 'app-create-hiring-manager',
  templateUrl: './create-hiring-manager.component.html',
  styleUrls: ['./create-hiring-manager.component.css']
})
export class CreateHiringManagerComponent implements OnInit {
  HM_Form: FormGroup;
  isUpdated = false;
  submitted = false;
  HM_Data = []; 
  fieldTextType: boolean;
  constructor(private formBuilder: FormBuilder, private SpocService:SpocService) { }

  HM_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  User_email = new FormControl('', [ Validators.required, Validators.email]);
  HM_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  HM_phone =new FormControl('', [ Validators.required, Validators.minLength(10)]);
  HM_password = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  HM_password2 = new FormControl('', [ Validators.required, Validators.minLength(2)]); 
  ngOnInit(): void {
    this.getHManagerList();
    this.HM_Form = this.formBuilder.group({
      HM_fullname : this.HM_fullname,
      User_email : this.User_email,
      HM_designation : this.HM_designation,
      HM_phone : this.HM_phone, 
      HM_password : this.HM_password,  
      HM_password2 : this.HM_password2,   
  
    }); 
  } 
  get f() { return this.HM_Form.controls; }
  onSubmit(){
    console.log(this.HM_Form.value);
    this.submitted = true;
    if (this.HM_Form.invalid) {  
      return;
    }else if(this.HM_Form.value.HM_password != this.HM_Form.value.HM_password2 ){
      alert("Password do not match!");
    }
    else{
      this.SpocService.createHManager(this.HM_Form.value).subscribe(data =>{
        console.log(data);
        this.isUpdated = true;
        this.getHManagerList(); 
     
      }); 
    }
  }
  getHManagerList(){
    this.SpocService.getHiringManagers().subscribe(data =>{
console.log(data);
      let HManagersList =[];
      for (var i = 0; i < data.length; i++) {
        var e = {
          "User_firstname" : data[i]['User_firstname'],
          "User_email" : data[i]['User_email'],
          "User_designation" : data[i]['User_designation'],
          "User_phonenumber" : data[i]['User_phonenumber'], 
          "User_id" : data[i]['User_id'],
        }
        HManagersList.push(e);
      } 
 
    this.HM_Data  = HManagersList;
   
    }); 

  } 

  deleteHM(HM_id){ 
    this.SpocService.deleteHM(HM_id).subscribe(data =>{
     console.log(data);  
     this.getHManagerList();
   
   }); 

 }

  resetForm(){ 
    this.HM_Form.reset();  
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
