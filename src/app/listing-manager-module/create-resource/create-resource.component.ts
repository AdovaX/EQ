import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ListingManagerService} from '../../Services/listing-manager.service';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.css']
})
export class CreateResourceComponent implements OnInit {
  Resource_Form: FormGroup;
  techFormGroup: FormGroup;
  domainFormGroup: FormGroup;
  jobRoleFormGroup: FormGroup;
  isUpdated = false;
  submitted = false;
  resourceLists = []; 
  techParents=[];
  fieldTextType: boolean; 
  checked = false;    
  disabled = false; 
  isError = false;
  technology_list =[];
  domain_list =[];
  jobRole_list =[];
  isTechError =false;
  isDoaminError =false;
  isJobError =false;

  constructor(private formBuilder: FormBuilder, private ListingManagerService:ListingManagerService) { }

  Resource_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Resource_email = new FormControl('', [ Validators.required, Validators.email]);
  Resource_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_experience =new FormControl('', [ Validators.required, Validators.minLength(10)]);
  Resource_password = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_password2 = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_status = new FormControl('VERIFIED', [ Validators.required]);
  Resource_summery = new FormControl('', [ Validators.required]); 
  Resource_stack = new FormControl('FULL',[Validators.required] );
  isRemote = new FormControl('BOTH',[Validators.required] );
  Resource_rate = new FormControl('', [ Validators.required]);
  Resource_availability = new FormControl('1', [ Validators.required]);
  Resource_phone = new FormControl('', [ Validators.required]);
  Technology_name = new FormControl('', [ Validators.required]);
  Technology_version = new FormControl('', [ Validators.required]);
  Technology_experience = new FormControl('', [ Validators.required]);
  Technology_level = new FormControl('EXPERT', [ Validators.required]);
  Technology_parent = new FormControl('', [ Validators.required]);
  Domain_name = new FormControl('', [ Validators.required]);
  Domain_duration = new FormControl('', [ Validators.required]);
  Job_title = new FormControl('', [ Validators.required]);
  Job_duration = new FormControl('', [ Validators.required]);

  ngOnInit(): void {
    this.getResources();
    this.getTechnologyParents();
    this.Resource_Form = this.formBuilder.group({
      Resource_name : this.Resource_name,
      Resource_email : this.Resource_email,
      Resource_designation : this.Resource_designation,
      Resource_experience : this.Resource_experience, 
      Resource_password : this.Resource_password,  
      Resource_password2 : this.Resource_password2,  
      Resource_status : this.Resource_status,  
      Resource_summery : this.Resource_summery,   
      Resource_stack : this.Resource_stack,  
      isRemote : this.isRemote,  
      Resource_rate : this.Resource_rate,  
      Resource_availability : this.Resource_availability, 
      Resource_phone : this.Resource_phone,  
  
    }); 
    this.techFormGroup = this.formBuilder.group({
      Technology_name : this.Technology_name,  
      Technology_version : this.Technology_version,  
      Technology_experience : this.Technology_experience,    
      Technology_level : this.Technology_level,  
      Technology_parent:this.Technology_parent
  
    });
    this.domainFormGroup = this.formBuilder.group({
      Domain_name : this.Domain_name,    
      Domain_duration : this.Domain_duration,    
  
    }); 
    this.jobRoleFormGroup = this.formBuilder.group({
      Job_title : this.Job_title,    
      Job_duration : this.Job_duration,        
  
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
      this.ListingManagerService.createResource(this.Resource_Form.value , this.technology_list ,this.domain_list,this.jobRole_list).subscribe(data =>{
        console.log("Form Submission sent");
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
  addTechnology(){
    if(this.techFormGroup.invalid){
      this.isTechError =true;

    }else{
      this.isTechError =false;
    let techData = {
      Technology : this.techFormGroup.value.Technology_name,
      Technology_version : this.techFormGroup.value.Technology_version,
      Technology_experience : this.techFormGroup.value.Technology_experience,
      Technology_level : this.techFormGroup.value.Technology_level,
      Technology_parent : this.techFormGroup.value.Technology_parent
    }
    this.technology_list.push(techData);
    this.techFormGroup.reset();
    console.log(this.technology_list);
  }
  }
  addDomain(){
    if(this.domainFormGroup.invalid){
    this.isDoaminError =true;

  }else{
    this.isDoaminError =false;
    let domainData = {
      Domain : this.domainFormGroup.value.Domain_name,
      Domain_duration : this.domainFormGroup.value.Domain_duration, 
    }
    this.domain_list.push(domainData);
    this.domainFormGroup.reset();
    console.log(this.domain_list);
  }
  }
  addJobTitle(){
    if(this.jobRoleFormGroup.invalid){
    this.isJobError =true;

  }else{
    this.isJobError =false;
    let jobRoleData = {
      Job_title : this.jobRoleFormGroup.value.Job_title,
      Job_duration : this.jobRoleFormGroup.value.Job_duration, 
    }
    this.jobRole_list.push(jobRoleData);
    this.jobRoleFormGroup.reset();
    console.log(this.jobRole_list);
  }
  }






  getResources(){
    this.ListingManagerService.getResources().subscribe(data =>{
      console.log(data);  
    this.resourceLists  = data;
   
    }); 

  } 

  getTechnologyParents(){
    this.ListingManagerService.getTechnologyParents().subscribe(data =>{
      console.log(data);  
    this.techParents  = data;
   
    }); 

  } 

  deleteResource(Resource_id){ 
    this.ListingManagerService.deleteResource(Resource_id).subscribe(data =>{
     console.log(data);  
     this.getResources();
   
   }); 

 }

  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
