import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {SpocService} from '../../Services/spoc.service';

@Component({
  selector: 'app-spoc-profile',
  templateUrl: './spoc-profile.component.html',
  styleUrls: ['./spoc-profile.component.css']
})
export class SpocProfileComponent implements OnInit {
  Spoc_id = sessionStorage.getItem('SPOC_ID');  
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
  Spoc_email = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Spoc_designation = new FormControl('', [ Validators.required]);
  Spoc_phone =new FormControl('', [ Validators.required]); 
  ngOnInit(): void {
    this.Spoc_Form = this.formBuilder.group({
      Spoc_name : this.Spoc_name, 
      Spoc_email : this.Spoc_email, 
      Spoc_designation : this.Spoc_designation, 
      Spoc_phone : this.Spoc_phone, 
  
    });
    this.getCompanyData(this.Spoc_id);
  }

  getCompanyData(id){
    var Spoc_id = id;
    this.SpocService.getProfileData(Spoc_id).subscribe(data =>{
     console.log(data);  
     this.Company_name = data[0]['CompanyTb'].C_full_name;
     this.Designation = data[0]['Spoc_designation'];

     this.Spoc_Form.controls.Spoc_name.setValue(data[0]['Spoc_name']);
     this.Spoc_Form.controls.Spoc_email.setValue(data[0]['Spoc_email']);
     this.Spoc_Form.controls.Spoc_designation.setValue(data[0]['Spoc_designation']);
     this.Spoc_Form.controls.Spoc_phone.setValue(data[0]['Spoc_phone']);  
     
     this.Spoc_fullname = data[0]['Spoc_name'];
     });  
 }

 onSubmit(){
  this.submitted = true;  
  console.log(this.Spoc_Form.value);
 if (this.Spoc_Form.invalid) {   
   return;
 }else{
   this.SpocService.updateSpoc(this.Spoc_id, this.Spoc_Form.value).subscribe(data =>{
     
      if(data['status'] == "Failed"){
       this.invalid = true;
     }else{
       this.invalid = false;
       this.isUpdated = true; 
     }
     this.getCompanyData(this.Spoc_id);  
   }); 
 }  
}

get f() { return this.Spoc_Form.controls; }

resetForm(){ this.Spoc_Form.reset();}

}
