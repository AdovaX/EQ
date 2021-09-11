import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"
import { ContractorService } from '../../Services/contractor.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-spoc-management',
  templateUrl: './spoc-management.component.html',
  styleUrls: ['./spoc-management.component.css']
})
export class SpocManagementComponent implements OnInit {
  User_id = 0;
  
  constructor(private route: ActivatedRoute
    ,private router:Router,private ContractorService:ContractorService,private formBuilder: FormBuilder) { 
      this.route.queryParams.subscribe(params => {
        console.log(params);
        this.User_id = params.User_id; 

    });
    }
    Spoc_Form: FormGroup;
    isUpdated = false;
    submitted = false;
    Spoc_Data = []; 
    fieldTextType: boolean;
    Spoc_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
    Spoc_email = new FormControl('', [ Validators.required, Validators.email]);
    Spoc_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
    Spoc_phone =new FormControl('', [ Validators.required, Validators.minLength(10)]);
    Spoc_password = new FormControl('', [  Validators.minLength(2)]);
    Spoc_password2 = new FormControl('', [   Validators.minLength(2)]);
    Spoc_status = new FormControl('1', );
  
  ngOnInit(): void { 
    this.Spoc_Form = this.formBuilder.group({
      Spoc_fullname : this.Spoc_fullname,
      Spoc_email : this.Spoc_email,
      Spoc_designation : this.Spoc_designation,
      Spoc_phone : this.Spoc_phone, 
      Spoc_password : this.Spoc_password,  
      Spoc_password2 : this.Spoc_password2,  
      Spoc_status : this.Spoc_status,  
  
    });
    this.ContractorService.getDelegatesById(this.User_id).subscribe(data =>{
      console.log(data);   
      this.Spoc_Form.controls.Spoc_fullname.setValue(data['User_firstname']);
      this.Spoc_Form.controls.Spoc_email.setValue(data['User_email']);
      this.Spoc_Form.controls.Spoc_designation.setValue(data['User_designation']);
      this.Spoc_Form.controls.Spoc_phone.setValue(data['User_phonenumber']); 

    
    }); 
  }
  onSubmit(){
    this.submitted = true;
    if (this.Spoc_Form.invalid) {  
      console.log(this.Spoc_Form.errors);
      return;
    }else if(this.Spoc_Form.value.Delegate_password != this.Spoc_Form.value.Delegate_password2 ){
      alert("Password do not match!");
    }
    else{
      console.log(this.Spoc_Form.value);
      this.ContractorService.editSpocData(this.Spoc_Form.value , this.User_id).subscribe(data =>{
        console.log(data);
        if(data['Status']){
          this.isUpdated = true;        
           console.log('done'); 
           setTimeout(() => {
            this.router.navigate(['/company/CreateSpoc']);
        }, 2000);
        }else{
          
        }

     
      }); 
    }

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  } 
   resetForm(){ 
    this.Spoc_Form.reset();  
  }
  get f() { return this.Spoc_Form.controls; }

}
