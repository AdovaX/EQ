import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {SpocService} from '../../Services/spoc.service';

@Component({
  selector: 'app-spoc-profile',
  templateUrl: './spoc-profile.component.html',
  styleUrls: ['./spoc-profile.component.css']
})
export class SpocProfileComponent implements OnInit {
  User_id = sessionStorage.getItem('USER_ID');  
  Spoc_Form: FormGroup;
  submitted = false;
  isUpdated = false;
  invalid = false;
  Company_id:number;
  Company_name:string = "";
  Designation:string = "";
  Spoc_fullname:string = "";
  constructor(private formBuilder: FormBuilder, private SpocService:SpocService) { }

  Spoc_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  User_email = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Spoc_designation = new FormControl('', [ Validators.required]);
  Spoc_phone =new FormControl('', [ Validators.required]); 
  ngOnInit(): void {
    console.log("--" + this.User_id +"---");
    this.Spoc_Form = this.formBuilder.group({
      Spoc_name : this.Spoc_name, 
      User_email : this.User_email, 
      Spoc_designation : this.Spoc_designation, 
      Spoc_phone : this.Spoc_phone, 
  
    });
    this.getCompanyData(this.User_id);
  }

  getCompanyData(id){
    var User_id = id;
    this.SpocService.getProfileData(User_id).subscribe(data =>{
        console.log(data);
        var userData =data[0];
        var spocData =data[0]['SpocTb'];
        var companyData =data[0]['SpocTb']['CompanyTb'];
        sessionStorage.setItem("SPOC_ID" , String(spocData.Spoc_id));
        console.log("=="+spocData.Spoc_id+"==");

     this.Company_name = companyData.C_short_name;
     this.Designation = spocData.Spoc_designation;

     this.Spoc_Form.controls.Spoc_name.setValue(spocData.Spoc_name);
     this.Spoc_Form.controls.User_email.setValue(userData.User_email);
     this.Spoc_Form.controls.Spoc_designation.setValue(spocData.Spoc_designation);
     this.Spoc_Form.controls.Spoc_phone.setValue(spocData.Spoc_phone);  
     
     this.Spoc_fullname = spocData.Spoc_name;
     });  
 }

 onSubmit(){
  this.submitted = true;  
  console.log(this.Spoc_Form.value);
 if (this.Spoc_Form.invalid) {   
   return;
 }else{
   this.SpocService.updateSpoc(this.User_id, this.Spoc_Form.value).subscribe(data =>{
     
      if(!data){
       this.invalid = true;
     }else{
       this.invalid = false;
       this.isUpdated = true; 
     }
     this.getCompanyData(this.User_id);  
   }); 
 }  
}

get f() { return this.Spoc_Form.controls; }

resetForm(){ this.Spoc_Form.reset();}

}
