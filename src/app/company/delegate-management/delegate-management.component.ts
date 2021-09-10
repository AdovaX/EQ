import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"
import { ContractorService } from '../../Services/contractor.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-delegate-management',
  templateUrl: './delegate-management.component.html',
  styleUrls: ['./delegate-management.component.css']
})
export class DelegateManagementComponent implements OnInit {
  User_id = 0;
  
  constructor(private route: ActivatedRoute
    ,private router:Router,private ContractorService:ContractorService,private formBuilder: FormBuilder) { 
      this.route.queryParams.subscribe(params => {
        console.log(params);
        this.User_id = params.User_id; 

    });
    }
    delegateForm: FormGroup; 
    fieldTextType: boolean;
    isUpdated = false;
    submitted = false;

    Delegate_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
    Delegate_email = new FormControl('', [ Validators.required, Validators.email]);
    Delegate_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
    Delegate_phone =new FormControl('', [ Validators.required, Validators.minLength(10)]);
    Delegate_password = new FormControl('', [   Validators.minLength(2)]);
    Delegate_password2 = new FormControl('', [   Validators.minLength(2)]);
    Delegate_status = new FormControl('1', [ Validators.required]);
  ngOnInit(): void { 
    this.delegateForm = this.formBuilder.group({
      Delegate_fullname : this.Delegate_fullname,
      Delegate_email : this.Delegate_email,
      Delegate_designation : this.Delegate_designation,
      Delegate_phone : this.Delegate_phone, 
      Delegate_password : this.Delegate_password,  
      Delegate_password2 : this.Delegate_password2,  
      Delegate_status : this.Delegate_status,  
  
    }); 
    this.ContractorService.getDelegatesById(this.User_id).subscribe(data =>{
      console.log(data);   
      this.delegateForm.controls.Delegate_fullname.setValue(data['User_firstname']);
      this.delegateForm.controls.Delegate_email.setValue(data['User_email']);
      this.delegateForm.controls.Delegate_designation.setValue(data['User_designation']);
      this.delegateForm.controls.Delegate_phone.setValue(data['User_phonenumber']); 

    
    }); 
  }
  onSubmit(){
    this.submitted = true;
    if (this.delegateForm.invalid) {  
      console.log(this.delegateForm.errors);
      return;
    }else if(this.delegateForm.value.Delegate_password != this.delegateForm.value.Delegate_password2 ){
      alert("Password do not match!");
    }
    else{
      this.ContractorService.editDelegateData(this.delegateForm.value , this.User_id).subscribe(data =>{
        console.log(data);
        this.isUpdated = true;        
         console.log('done');

     
      }); 
    }

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  } 
   resetForm(){ 
    this.delegateForm.reset();  
  }
  get f() { return this.delegateForm.controls; }

}
