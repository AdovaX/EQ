import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ListingManagerService} from '../../Services/listing-manager.service';
import {Router} from "@angular/router"; 
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import * as moment from 'moment';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupTechnologyComponent } from '../popup-technology/popup-technology.component';
import { PopupDomainComponent } from '../popup-domain/popup-domain.component';
import { PopupRoleComponent } from '../popup-role/popup-role.component';
import { PopupEducationComponent } from '../popup-education/popup-education.component';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
  R_id=0; 

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
  Resource_cvFile="";
  Resource_profile_pic="";

  constructor(private _Activatedroute:ActivatedRoute,private formBuilder: FormBuilder,
    private ListingManagerService:ListingManagerService,private Router:Router,public dialog: MatDialog) { 
    this.R_id =Number(this._Activatedroute.snapshot.paramMap.get("id")) | Number(sessionStorage.getItem('RESOURCE_ID'));;

  }

  Resource_id = new FormControl('', [ Validators.required ]);
  Resource_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Resource_email = new FormControl('', [ Validators.required, Validators.email]);
  Resource_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_experience =new FormControl('', [ Validators.required, Validators.minLength(10)]);
  Resource_password = new FormControl('', );
  Resource_password2 = new FormControl('',);
  Resource_status = new FormControl('AVAILABLE', [ Validators.required]);
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
  Resource_id : this.Resource_id,
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
       console.log(data);  
      this.tech_lists=data; 
    }); 
  
  }
  getEducationLists(){
    this.ListingManagerService.getEducationLists().subscribe(data =>{
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
  this.ListingManagerService.getResourceData(this.R_id).subscribe(data =>{
    console.log("----"+this.R_id);  
    console.log(data);     
    console.log("----");  


    let profileData = data;
    let domainData = data['Resource_domainTbs'];
    let educationData = data['Resource_educationTbs'];
    let roleData = data['Resource_rolesTbs'];
    let techData = data['Resource_technologiesTbs'];
     
     
    
    
    this.Resource_Form.controls.Resource_id.setValue(profileData['Resource_id']);
    this.Resource_Form.controls.Resource_name.setValue(profileData['Resource_name']);
    this.Resource_Form.controls.Resource_email.setValue(profileData['Resource_Email']);
    this.Resource_Form.controls.Resource_designation.setValue(profileData['Resource_Designation']);
    this.Resource_Form.controls.Resource_experience.setValue(profileData['Resource_Experience']);
    this.Resource_Form.controls.Resource_summery.setValue(profileData['Resource_summery']);
    this.Resource_Form.controls.Resource_stack.setValue(profileData['Resource_stack']);
    this.Resource_Form.controls.isRemote.setValue(profileData['Is_remote']);
    this.Resource_Form.controls.Resource_rate.setValue(profileData['Resource_rate']);
    this.Resource_Form.controls.Resource_availability.setValue(profileData['Availability_status']);
    this.Resource_Form.controls.Resource_phone.setValue(profileData['Resource_phone']);
    this.Resource_Form.controls.Available_from.setValue(profileData['Available_from']);
    this.Resource_Form.controls.Available_to.setValue(profileData['Available_to']); 
    this.Resource_cvFile =  profileData['Resource_resume'];
    this.Resource_profile_pic = profileData['Resource_photo'];

   
  for (var domains of domainData) { 
    if(domains.RDomain){
    let domainData = {
      Domain : domains.RDomain,
      Domain_duration : domains.RDomain_duration, 
    }
    this.domain_list.push(domainData); 
  }
}
for (var edu of educationData) { 
  if(edu.REducation){
  let eduData = {
    Education : edu.REducation,
    Pass_year : edu.REducation_passyear, 
  }
  this.education_list.push(eduData);  
}
} 
for (var role of roleData) { 
  if(role.RRole_name){ 
  let jobRoleData = {
    Job_title :role.RRole_name,
    Job_duration : role.RRole_duration, 
  }
  this.jobRole_list.push(jobRoleData);   
}
}

for (var tech of techData) { 
  if(tech.RTechnology_name){ 
    let techData = {
      Technology : tech.RTechnology_name,
      Technology_version : tech.RTechnology_version,
      Technology_experience : tech.RTechnology_duration,
      Technology_level : tech.RTechnology_level, 
    }
    this.technology_list.push(techData);  
}
}



  }); 
}
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
   
    this.ListingManagerService.editResource(this.Resource_Form.value , this.technology_list ,this.domain_list,
      this.jobRole_list , this.education_list, this.fileToUpload , this.videoFile).subscribe(data =>{
      console.log("Form Submission sent");
      console.log(data);
      this.isUpdated = true; 
      console.log("Done");  
    let Role_id = Number(sessionStorage.getItem('ROLE_ID'));
    if(Role_id > 7){
      setTimeout(() => {
        this.Router.navigate(['/company/Resources']);
    }, 3000); 
    }
    }, error => {
      console.log(error);
      this.isUpdated = false; 
      this.isError = true;
    }); 
  }
}

handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
  console.log(files.item(0).name); 
}
profilePhotoChange(files: FileList) { 

  this.ListingManagerService.profilePhotoChange(files.item(0),this.R_id).subscribe(data =>{
    console.log("profilePhotoChange sent"); 
    console.log(data);
  }, error => {
    console.log(error); 
  });




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

PopupTechnology(e){ 
  
  const dialogRef = this.dialog.open(PopupTechnologyComponent, {
    width: '100%',
    height : 'auto',
    data: {Technology_name: e} 
  }); 
  dialogRef.afterClosed().subscribe(result => { 
    console.log(result); 
    let techData = {
      Technology : result.Technology_name,
      Technology_version : result.Technology_version,
      Technology_experience : result.Technology_experience,
      Technology_level : result.Technology_level, 
    }
    this.technology_list.push(techData);
    console.log('==='); 
    console.log(this.technology_list); 
  }); 
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

domainChange(e): void { 
  if(e.target.checked){ 
  const dialogRef = this.dialog.open(PopupDomainComponent, {
    width: '450px',
    data: {name: e.target.value}, 
    hasBackdrop: true,
    disableClose : true
  }); 
  dialogRef.afterClosed().subscribe(result => { 
   this.isDoaminError =false;
   if(result.Experience > 0){
    let domainData = {
      Domain : e.target.value,
      Domain_duration : result.Experience, 
    }
    this.domain_list.push(domainData);
    console.log(this.domain_list);  
   }else{
    e.target.checked =false;
   }
  });
}else{ 
  this.domain_list = this.domain_list.filter(m=>m.Domain!==e.target.value);
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

roleChange(e): void { 
  if(e.target.checked){ 
  const dialogRef = this.dialog.open(PopupRoleComponent, {
    width: '450px',
    data: {name: e.target.value},
    hasBackdrop: true,
    disableClose : true
  }); 
  dialogRef.afterClosed().subscribe(result => { 
   this.isJobError =false;
   if(result.Experience > 0){
    let jobRoleData = {
     Job_title : e.target.value,
     Job_duration : result.Experience, 
   }
   this.jobRole_list.push(jobRoleData); 
   console.log(this.jobRole_list);  
   }else{
    e.target.checked =false;
   }
  });
}else{ 
  this.jobRole_list = this.jobRole_list.filter(m=>m.Job_title!==e.target.value);
  console.log(this.jobRole_list);
} 
}

addEducation(){
  if(this.educationFormGroup.invalid){
  this.isEduError =true;

}else{
  this.isEduError =false;
  let eduData = {
    Education : this.educationFormGroup.value.Education,
    Pass_year : this.educationFormGroup.value.Pass_year, 
  }
  this.education_list.push(eduData);
  this.educationFormGroup.reset();
  console.log(this.education_list);
}
}

educationChange(e): void { 
  if(e.target.checked){ 
  const dialogRef = this.dialog.open(PopupEducationComponent, {
    width: '450px',
    data: {name: e.target.value}, 
    hasBackdrop: true,
    disableClose : true
  }); 
  dialogRef.afterClosed().subscribe(result => { 
   this.isDoaminError =false;
   if(result.Passout_year != 0){
    let eduData = {
      Education : e.target.value,
      Pass_year : result.Passout_year, 
    }
    this.education_list.push(eduData);
    console.log(this.education_list);  
   }else{
    e.target.checked =false;
   }
  });
}else{ 
  this.education_list = this.education_list.filter(m=>m.Qualification!==e.target.value);
  console.log(this.education_list);
} 
}

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
}
