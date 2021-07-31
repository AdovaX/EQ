import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
projects=[];
n =1;
  constructor(private ProjectService :ProjectService , private Router:Router) { }

  ngOnInit(): void {
    this.ProjectService.getProjects().subscribe(data =>{
        this.projects = data;
  }, error => {
    console.log(error); 
  });
  }
  createAssignment(Project_id){
     this.Router.navigate(['/L2Dashboard/Projectmanagement/Createassignment',Project_id]); 
 
  }
  gotoAssignment(Project_id){
     this.Router.navigate(['/L2Dashboard/Projectmanagement/Requirements',Project_id]); 
 
  }
  gotoProject(Project_id){
    this.Router.navigate(['/L2Dashboard/Projectmanagement/ProjectDetails',Project_id]); 

  }

}
