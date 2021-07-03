import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ContractorService } from '../../Services/contractor.service';

@Component({
  selector: 'app-delegate',
  templateUrl: './delegate.component.html',
  styleUrls: ['./delegate.component.css']
})
export class DelegateComponent implements OnInit {

Contractor_id = sessionStorage.getItem('CONTRACTOR_ID');  
  delegateForm: FormGroup;
  isUpdated = false;
  submitted = false;
  delegateData = [];

  

  constructor(private formBuilder: FormBuilder, private ContractorService:ContractorService) { }

  Delegate_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Delegate_email = new FormControl('', [ Validators.required, Validators.email]);
  Delegate_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Delegate_phone =new FormControl('', [ Validators.required, Validators.minLength(10)]);
  Delegate_password = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Delegate_password2 = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Delegate_status = new FormControl('', [ Validators.required]);

  ngOnInit(): void {
    this.get_delegatesList();
    this.delegateForm = this.formBuilder.group({
      Delegate_fullname : this.Delegate_fullname,
      Delegate_email : this.Delegate_email,
      Delegate_designation : this.Delegate_designation,
      Delegate_phone : this.Delegate_phone, 
      Delegate_password : this.Delegate_password,  
      Delegate_password2 : this.Delegate_password2,  
      Delegate_status : this.Delegate_status,  
  
    }); 
  } 
  get f() { return this.delegateForm.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.delegateForm.invalid) {  
      return;
    }else if(this.delegateForm.value.Delegate_password != this.delegateForm.value.Delegate_password2 ){
      alert("Password do not match!");
    }
    else{
      this.ContractorService.createDelegate(this.delegateForm.value).subscribe(data =>{
        console.log(data);
        this.isUpdated = true;
        this.get_delegatesList();
     
      }); 
    }
  }
  get_delegatesList(){
    this.ContractorService.getDelegatesList().subscribe(data =>{
      console.log(data);  
    this.delegateData  = data;
   
    }); 

  }

}
