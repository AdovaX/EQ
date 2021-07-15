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
  gotoAssignment(Project_id){
     this.Router.navigate(['/L5Dashboard/Projectmanagement/Createassignment',Project_id]); 
 
  }

}
