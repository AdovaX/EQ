import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ContractorService } from '../../Services/contractor.service';


@Component({
  selector: 'app-create-spoc',
  templateUrl: './create-spoc.component.html',
  styleUrls: ['./create-spoc.component.css']
})
export class CreateSpocComponent implements OnInit {
  Contractor_id = sessionStorage.getItem('CONTRACTOR_ID');  
  Spoc_Form: FormGroup;
  isUpdated = false;
  submitted = false;
  Spoc_Data = [];

  constructor(private formBuilder: FormBuilder, private ContractorService:ContractorService) { }

  Spoc_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Spoc_email = new FormControl('', [ Validators.required, Validators.email]);
  Spoc_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Spoc_phone =new FormControl('', [ Validators.required, Validators.minLength(10)]);
  Spoc_password = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Spoc_password2 = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Spoc_status = new FormControl('', [ Validators.required]);

  ngOnInit(): void {
    this.getSpocList();
    this.Spoc_Form = this.formBuilder.group({
      Spoc_fullname : this.Spoc_fullname,
      Spoc_email : this.Spoc_email,
      Spoc_designation : this.Spoc_designation,
      Spoc_phone : this.Spoc_phone, 
      Spoc_password : this.Spoc_password,  
      Spoc_password2 : this.Spoc_password2,  
      Spoc_status : this.Spoc_status,  
  
    }); 
  } 
  get f() { return this.Spoc_Form.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.Spoc_Form.invalid) {  
      return;
    }else if(this.Spoc_Form.value.Spoc_password != this.Spoc_Form.value.Spoc_password2 ){
      alert("Password do not match!");
    }
    else{
      this.ContractorService.createSpoc(this.Spoc_Form.value).subscribe(data =>{
        console.log(data);
        this.isUpdated = true;
        this.getSpocList();
     
      }); 
    }
  }
  getSpocList(){
    this.ContractorService.getSpocList().subscribe(data =>{
      console.log(data);  
    this.Spoc_Data  = data;
   
    }); 

  }

}
