import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ListingManagerService} from '../../Services/listing-manager.service';
import {Router} from "@angular/router"
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupDomainComponent } from '../popup-domain/popup-domain.component';
import { PopupRoleComponent } from '../popup-role/popup-role.component'; 
import { PopupTechnologyComponent } from '../popup-technology/popup-technology.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { PopupEducationComponent } from '../popup-education/popup-education.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupResourceProfileComponent } from '../popup-resource-profile/popup-resource-profile.component';

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
  educationStreams =[];
  educationMtechs =[];
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
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;  
  default_profile_pic ="https://photoseq.s3.ap-south-1.amazonaws.com/profile_photo.png";

  displayedColumns: string[] = ['No','Resource_active','Resource_name', 'Resource_Designation', 
  'Resource_rate','Available_from','Available_to','Remaining','Action'];
  dataSource = new MatTableDataSource();

 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  } 
  constructor(private formBuilder: FormBuilder, private ListingManagerService:ListingManagerService,
    private Router:Router,public dialog: MatDialog,private snackBar: MatSnackBar) {
      
     }
    
    
  
  Resource_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Resource_salutation= new FormControl('Mr.');
  Resource_currency= new FormControl('INR');
  Resource_email = new FormControl('', [ Validators.required, Validators.email]);
  Resource_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_experience =new FormControl('', [ Validators.required, Validators.minLength(10)]);
  Resource_password = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_password2 = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Resource_status = new FormControl('AVAILABLE', [ Validators.required]);
  Resource_summery = new FormControl(''); 
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
  Resource_location = new FormControl('');

  ngOnInit(): void { 
    this.getResources();
    this.getTechnologyLists();
    this.getEducationLists();
    this.getDomainLists();
    this.getJobRoleLists(); 
    this.Resource_Form = this.formBuilder.group({
      Resource_name : this.Resource_name,
      Resource_salutation : this.Resource_salutation,
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
      Resource_currency : this.Resource_currency,  
      Resource_availability : this.Resource_availability, 
      Resource_phone : this.Resource_phone,  
      Available_from : this.Available_from,  
      Available_to : this.Available_to,  
      Resource_location : this.Resource_location,  
  
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
  openSnackBar(message: string, action: string='') {
    this.snackBar.open(message, action, {
      duration: 1500,
    });
}
passwordMatchCheck(){
  if(this.Resource_Form.value.Resource_password != this.Resource_Form.value.Resource_password2 ){
    alert("Password do not match!");
  }
}
viewResourceProfile(id){
console.log(id);
  const dialogRef = this.dialog.open(PopupResourceProfileComponent, {
    width: '650px',
    data: {Resource_id: id}, 
    hasBackdrop: true,
    disableClose : false
  }); 
  dialogRef.afterClosed().subscribe(result => { 
    
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
     
      this.ListingManagerService.createResource(this.Resource_Form.value , this.technology_list ,this.domain_list,
        this.jobRole_list , this.education_list, this.fileToUpload , this.videoFile).subscribe(data =>{
          this.openSnackBar('Your Resource has been added successfully.'); 

          setTimeout(() => { 
        this.getResources();   
        this.onRefresh();
        this.isUpdated = true;  
          }, 2000);   
      }, error => {
        console.log(error);
        this.isUpdated = false; 
        this.isError = true;
      }); 
    }
  }
  onRefresh() {
    this.Router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  
    let currentUrl = this.Router.url + '?';
  
    this.Router.navigateByUrl(currentUrl)
      .then(() => {
        this.Router.navigated = false;
        this.Router.navigate([this.Router.url]);
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

  getDays(from ,to){ 

    var end = moment(to, 'YYYY-MM-DD'); 
    var given = moment(end, "YYYY-MM-DD");
    var current = moment().startOf('day');
    var completion = moment.duration(given.diff(current)).asDays();
    if(completion <1){
      completion = 0; 
    } 
    let c   = (completion < 1)?  completion +"Day" :  completion+"Days";
    return c;
  }

  getResources(){
    this.ListingManagerService.getResources().subscribe(data =>{
    console.log(data);
    this.resourceLists  = data;
    this.dataSource.data =data;
   
    }); 

  } 
  updateFrom(e,r_id){
    let fromDate = e.value;
    fromDate =  moment(fromDate).format('YYYY-MM-DD'); 
    this.ListingManagerService.updateFrom(fromDate,r_id).subscribe(data =>{
      console.log(data); 
      this.getResources();  
    });

  }
  updateTo(e,r_id){
    let toDate = e.value;
    toDate =  moment(toDate).format('YYYY-MM-DD'); 
    this.ListingManagerService.updateTo(toDate,r_id).subscribe(data =>{
      console.log(data);  
      this.getResources(); 
   
    });
  }
  exportExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.resourceLists, );
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'filename.xlsx');
}

  getTechnologyParents(){
    this.ListingManagerService.getTechnologyParents().subscribe(data =>{
      console.log(data);  
    this.techParents  = data;
   
    }); 

  } 

  deleteResource(Resource_id){ 
    this.ListingManagerService.deleteResource(Resource_id).subscribe(data =>{ 
     this.getResources();
   
   }); 

 }
 toogleActive(Resource_id , currentValue){
   if(currentValue == 1){
     currentValue =0;
   }else{ 
    currentValue =1;

   }
  this.ListingManagerService.toogleActive(Resource_id,currentValue).subscribe(data =>{ 
    this.getResources();
  
  });
 }
  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
 

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0); 
}
 
 


introVideo(Resource_id){
  this.Router.navigate(['/company/IntroVideo',Resource_id]); 
}


getDomainLists(){
  this.ListingManagerService.getDomainLists().subscribe(data =>{
    console.log(data);  
    this.RDomains_List=data;
    
  
  }); 

}
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
editResource(r_id){
  this.Router.navigate(['/company/Edit',r_id]); 


}
profileCompletion(r_id){
  this.ListingManagerService.profileCompletion(r_id).subscribe(data =>{
    return data;
  }); 

}

}