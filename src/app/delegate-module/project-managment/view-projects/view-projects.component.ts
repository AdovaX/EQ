import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit {

  Project_id;
  assignmentLists=[];
  project_data=[];
  constructor(  private _Activatedroute:ActivatedRoute,private ProjectService :ProjectService, private formBuilder: FormBuilder,) { 
    this.Project_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));
   
  }
  ngOnInit(): void {
    this.getProjectData();
    this.getAssignments();
  }
  getProjectData(){
this.ProjectService.getProjectById(this.Project_id).subscribe(data =>{
  this.project_data['projectName'] = data['Project_name'];
  this.project_data['Description'] = data['Description'];
  this.project_data['Start_date'] = data['Start_date'];
  this.project_data['End_date'] = data['End_date']; 
  this.project_data['Description'] = data['Description']; 
  this.project_data['Need_remote'] = data['Need_remote']; 
  this.project_data['Project_location'] = data['Project_location']; 
   console.log(data);
});
  }
  getAssignments(){
    this.ProjectService.getAssignmentsById(this.Project_id).subscribe(data =>{
       
      console.log("----");
      this.assignmentLists = data;
      console.log(data);
    });
  }

}
