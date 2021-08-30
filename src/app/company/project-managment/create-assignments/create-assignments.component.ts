 import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router";
import { ListingManagerService } from '../../../Services/listing-manager.service';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupTechnologyComponent } from '../../popup-technology/popup-technology.component';
import { PopupEducationComponent } from '../../popup-education/popup-education.component';
import { PopupDomainComponent } from '../../popup-domain/popup-domain.component';
import { PopupRoleComponent } from '../../popup-role/popup-role.component';

@Component({
  selector: 'app-create-assignments',
  templateUrl: './create-assignments.component.html',
  styleUrls: ['./create-assignments.component.css']
})
export class CreateAssignmentsComponent implements OnInit {
  Project_id;
  Requirement_Form: FormGroup; 
  submitted = false; 
  domainsList=[];
  rolesList=[];
  technologiesList=[];
  educationsList=[];
  selectedTechnologies=[];
  selectedDomains=[];
  selectedEducation=[];
  selectedRoles=[];
  User_id;
  mainTech=[];
  RDomains_List: any[];
  RJobRoles_List: any[];
  tech_lists: any[];
  educations: any[];
  isDoaminError: boolean;
  education_list =[]; 
  educationStreams =[];
  educationMtechs=[];
  domain_list=[];
  isJobError: boolean;
  jobRole_list=[];
  technology_list=[];
  techFormGroup: FormGroup;
  domainFormGroup: FormGroup;
  jobRoleFormGroup: FormGroup;
  educationFormGroup: FormGroup;
  isTechError: boolean;
  isEduError: boolean;
  project_stime :Date;
project_etime:Date;
  constructor(  private _Activatedroute:ActivatedRoute,public dialog: MatDialog, private ListingManagerService:ListingManagerService, private ProjectService :ProjectService, private formBuilder: FormBuilder,private Router:Router) { 
    this.Project_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));
    this.User_id = sessionStorage.getItem('USER_ID');  
  }

  Project_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Requirement_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Week_duration = new FormControl('', [ Validators.required ]);
  Week_must_time = new FormControl('', [ Validators.required]);
  Technology_id = new FormControl('');
  Domain_id = new FormControl('' );
  Roles_id = new FormControl('' );
  Certification = new FormControl('' );
  Hours_per_week = new FormControl('', [ Validators.required ]);
  Hours_per_month = new FormControl('', [ Validators.required ]);
  Hours_per_day = new FormControl('', [ Validators.required ]);
  No_of_resources = new FormControl('', [ Validators.required ]);
  Requirements_description = new FormControl('', [ Validators.required ]);
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
  Start_date = new FormControl('', [ Validators.required]);
  End_date = new FormControl('', [ Validators.required]);

  ngOnInit(): void {
    this.findProject(); 
    this.getTechnologyLists();
    this.getEducationLists();
    this.getDomainLists();
    this.getJobRoleLists(); 
    this.Requirement_Form = this.formBuilder.group({
      Project_name : this.Project_name,
      Requirement_name : this.Requirement_name,
      Week_duration : this.Week_duration,
      Week_must_time : this.Week_must_time,
      Technology_id : this.formBuilder.array([]),
      Domain_id : this.formBuilder.array([]),
      Roles_id : this.formBuilder.array([]),
      Certification : this.formBuilder.array([]),
      Hours_per_week : this.Hours_per_week,
      Hours_per_month : this.Hours_per_month,
      Hours_per_day : this.Hours_per_day,
      No_of_resources : this.No_of_resources,
      Requirements_description : this.Requirements_description, 
      Start_date : this.Start_date, 
      End_date : this.End_date,  
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
   
 
onSubmit(){
   

  if (this.Requirement_Form.invalid) {  
    this.submitted =true; 
    console.log("Form error" + this.Requirement_Form.errors);
    return;
  }else{  
 
    this.ProjectService.createRequirement(this.Requirement_Form.value,this.technology_list,this.domain_list
      ,this.jobRole_list,this.education_list,this.Project_id).subscribe(data =>{
          
         this.Router.navigate(['company/Projectmanagement']);  

    }, error => {
      console.log(error); 
    });
  }

}
findProject(){
  this.ProjectService.searchProjectById(this.Project_id).subscribe(data =>{ 
    this.Requirement_Form.controls.Project_name.setValue(data['Project_name']);
    this.project_stime =data['Start_date'];
    this.project_etime =data['End_date']; 

}, error => {
  console.log(error); 
});
} 
get f() { return this.Requirement_Form.controls; }




getDomainLists(){
  this.ListingManagerService.getDomainLists().subscribe(data =>{
     this.RDomains_List=data;
    
  
  }); 

}
getJobRoleLists(){
  this.ListingManagerService.getJobRoleLists().subscribe(data =>{
     this.RJobRoles_List=data; 
  }); 

}
getTechnologyLists(){
  this.ListingManagerService.getTechnologyLists().subscribe(data =>{
     
    this.tech_lists=data; 
  }); 

}
getEducationLists(){
  this.ListingManagerService.getEducationLists().subscribe(data =>{
      
    this.educations=data; 
  }); 

}

getEduStreams(val,e){
  this.ListingManagerService.getEduStreams(val).subscribe(data =>{
    console.log("----");  
    console.log(data);  
    this.educationStreams=data; 
    console.log(data.length);
    if(data.length ==0){
    this.educationChangePopup(e);
    }
  }); 

}
 
educationChange(e): void {  
  console.log(e.target.value);
  this.getEduStreams(e.target.value ,e);
 
}

 
educationChangePopup(e): void { 
   
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
    }else{
    e.target.checked =false;
   }
  });
}else{ 
  this.domain_list = this.domain_list.filter(m=>m.Domain!==e.target.value);
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
    }else{
    e.target.checked =false;
   }
  });
}else{ 
  this.jobRole_list = this.jobRole_list.filter(m=>m.Job_title!==e.target.value);
 } 
}

removeDomain(domainChange){

  for (let [i, user] of this.domain_list.entries()) {
    if (user.Domain == domainChange) {
        this.domain_list.splice(i, 1);
        console.log('deleted domain');
    }
 }
}
removeRole(roleChange){
  for (let [i, user] of this.jobRole_list.entries()) {
    if (user.Job_title == roleChange) {
        this.jobRole_list.splice(i, 1);
        console.log('deleted Job_title');
    }
 }
}
removeEdu(eduChange){
  for (let [i, user] of this.education_list.entries()) {
    if (user.Education == eduChange) {
        this.education_list.splice(i, 1);
        console.log('deleted Education');
    }
 }
}
removeTech(tecChange){
  for (let [i, user] of this.technology_list.entries()) {
    if (user.Technology == tecChange) {
        this.technology_list.splice(i, 1);
        console.log('deleted Technology');
    }
 }
}
PopupTechnology(e){

  
    const dialogRef = this.dialog.open(PopupTechnologyComponent, {
      width: '100%',
      height : 'auto',
      data: {Technology_name: e} 
    }); 
    dialogRef.afterClosed().subscribe(result => { 
       let techData = {
        Technology : result.Technology_name,
        Technology_version : result.Technology_version,
        Technology_experience : result.Technology_experience,
        Technology_level : result.Technology_level, 
      }
      this.technology_list.push(techData); 
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
}
}
}
