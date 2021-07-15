 import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router"
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
  technologiesList=[];
  educationsList=[];
  constructor(  private _Activatedroute:ActivatedRoute,private ProjectService :ProjectService, private formBuilder: FormBuilder,) { 
    this.Project_id =this._Activatedroute.snapshot.paramMap.get("id");

   
  }


  Project_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Requirement_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Week_duration = new FormControl('', [ Validators.required ]);
  End_date = new FormControl('', [ Validators.required]);
  Description = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Status = new FormControl('ACTIVE', [ Validators.required ]);
  Need_remote = new FormControl('YES', [ Validators.required ]);

  ngOnInit(): void {
    this.findProject();
    this.getDomains();
    this.getEducation();
    this.getTechnology();
    this.Requirement_Form = this.formBuilder.group({
      Project_name : this.Project_name,
      Requirement_name : this.Requirement_name,
      Week_duration : this.Week_duration,
      End_date : this.End_date,
      Description : this.Description,
      Status : this.Status,
      Need_remote : this.Need_remote
    });
  }
onSubmit(){
  console.log(this.Requirement_Form.value);
  if (this.Requirement_Form.invalid) {  
    this.submitted =true;
    return;
  }else{
    this.ProjectService.createProject(this.Requirement_Form.value).subscribe(data =>{
        if(data['Project_id']>0){
          
        } 
    }, error => {
      console.log(error); 
    });
  }

}
findProject(){
  this.ProjectService.searchProjectById(this.Project_id).subscribe(data =>{
    console.log(data);
    this.Requirement_Form.controls.Project_name.setValue(data['Project_name']);

}, error => {
  console.log(error); 
});
}
getDomains(){
  this.ProjectService.getDomains().subscribe(data =>{
    console.log(data);
    this.domainsList=data;
    

}, error => {
  console.log(error); 
});
}
getTechnology(){
  this.ProjectService.getTechnology().subscribe(data =>{
    console.log(data);
    this.technologiesList = data;
    

}, error => {
  console.log(error); 
});
}
getEducation(){
  this.ProjectService.getEducation().subscribe(data =>{
    console.log(data);
    this.educationsList = data;
    

}, error => {
  console.log(error); 
});

}
get f() { return this.Requirement_Form.controls; }

}
