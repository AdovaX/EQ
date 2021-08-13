import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ListingManagerService} from '../../Services/listing-manager.service';
import {Router} from "@angular/router"; 
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
  Resource_id=0; 

  Resource_Form: FormGroup;
  techFormGroup: FormGroup;
  domainFormGroup: FormGroup;
  jobRoleFormGroup: FormGroup;
  educationFormGroup: FormGroup;
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
  education_list =[];
  educations =[];
  isTechError =false;
  isDoaminError =false;
  isJobError =false;
  isEduError =false;
  RDomains_List=[]
  RJobRoles_List=[]
  resource_domain=[];
  tech_lists=[];
  today = moment().format('YYYY-MM-DD'); 
  fileToUpload: File;
  videoFile: File;

  constructor(private _Activatedroute:ActivatedRoute,private formBuilder: FormBuilder,private ListingManagerService:ListingManagerService,private Router:Router) { 
    this.Resource_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));

  }

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
  Education = new FormControl('', [ Validators.required]);
  Pass_year = new FormControl('', [ Validators.required]);
  Available_from = new FormControl('', [ Validators.required]);
  Available_to = new FormControl('', [ Validators.required]);




  ngOnInit(): void {
this.getResourceData();

 
this.getTechnologyLists();
this.getEducationLists();
this.getDomainLists();
this.getJobRoleLists();


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
  Available_from : this.Available_from,  
  Available_to : this.Available_to,  

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
this.educationFormGroup = this.formBuilder.group({
  Education : this.Education,    
  Pass_year : this.Pass_year,        

});  

  }

  get f() { return this.Resource_Form.controls; }
  get techform() { return this.techFormGroup.controls; }

  getJobRoleLists(){
    this.ListingManagerService.getJobRoleLists().subscribe(data =>{
      console.log(data);  
      this.RJobRoles_List=data; 
    }); 
  
  }
  getTechnologyLists(){
    this.ListingManagerService.getTechnologyLists().subscribe(data =>{
      console.log("----");  
      console.log(data);  
      this.tech_lists=data; 
    }); 
  
  }
  getEducationLists(){
    this.ListingManagerService.getEducationLists().subscribe(data =>{
      console.log("----");  
      console.log(data);  
      this.educations=data; 
    }); 
  
  }
 
 
getDomainLists(){
  this.ListingManagerService.getDomainLists().subscribe(data =>{
    console.log(data);  
    this.RDomains_List=data; 
  });  
}


getResourceData(){
  this.ListingManagerService.getResourceData(this.Resource_id).subscribe(data =>{
    console.log("----");  
    console.log(data);  

    this.Resource_Form.controls.Resource_name.setValue(data['Resource_name']);

  }); 
}
}
