import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {DelegateService} from '../../Services/delegate.service';
import { SpocDelegateService } from '../../Services/spoc-delegate.service'; 
import {ListingManagerService} from '../../Services/listing-manager.service';



@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {
  Resource_Form: FormGroup;
  isUpdated = false;
  submitted = false;
  resourceLists = []; 
  fieldTextType: boolean; 
  checked = false;    
  disabled = false; 
  isError = false;

  constructor(private formBuilder: FormBuilder, private ListingManagerService:ListingManagerService, 
    private SpocDelegateService:SpocDelegateService) { }

  Resource_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Resource_email = new FormControl('', [ Validators.required, Validators.email]);
  Resource_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_experience =new FormControl('', [ Validators.required, Validators.minLength(10)]);
  Resource_password = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_password2 = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_status = new FormControl('VERIFIED', [ Validators.required]);
  Resource_summery = new FormControl('', [ Validators.required]);
  Resource_masked = new FormControl('NO',  [Validators.required] );
  Resource_stack = new FormControl('FULL',[Validators.required] );
  isRemote = new FormControl('BOTH',[Validators.required] );
  Resource_rate = new FormControl('', [ Validators.required]);
  Resource_availability = new FormControl('1', [ Validators.required]);

  ngOnInit(): void {
    this.getResources();
    this.Resource_Form = this.formBuilder.group({
      Resource_name : this.Resource_name,
      Resource_email : this.Resource_email,
      Resource_designation : this.Resource_designation,
      Resource_experience : this.Resource_experience, 
      Resource_password : this.Resource_password,  
      Resource_password2 : this.Resource_password2,  
      Resource_status : this.Resource_status,  
      Resource_summery : this.Resource_summery,  
      Resource_masked : this.Resource_masked,  
      Resource_stack : this.Resource_stack,  
      isRemote : this.isRemote,  
      Resource_rate : this.Resource_rate,  
      Resource_availability : this.Resource_availability,  
  
    }); 
  } 
  get f() { return this.Resource_Form.controls; }
  onSubmit(){ 
    console.log(this.Resource_Form.value);
    this.submitted = true;
    if (this.Resource_Form.invalid) {  
      return;
    }else if(this.Resource_Form.value.Resource_password != this.Resource_Form.value.Resource_password2 ){
      alert("Password do not match!");
    }
    else{
      
    console.log(this.Resource_Form.value);
      this.SpocDelegateService.createResource(this.Resource_Form.value).subscribe(data =>{
        
        console.log(data);
        this.isUpdated = true; 
        this.getResources();  
      }, error => {
        console.log(error);
        this.isUpdated = false; 
        this.isError = true;
      }); 
    }
  }
  getResources(){
    this.SpocDelegateService.getResources().subscribe(data =>{
      console.log(data);  
    this.resourceLists  = data;
   
    }); 

  } 

  deleteResource(Resource_id){ 
    this.ListingManagerService.deleteResource(Resource_id).subscribe(data =>{
     console.log(data);  
     this.getResources();
   
   }); 

 }

  resetForm(){ 
    this.Resource_Form.reset();  
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}