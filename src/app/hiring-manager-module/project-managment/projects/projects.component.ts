import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../Services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
projects=[];
n =1;
  constructor(private ProjectService :ProjectService) { }

  ngOnInit(): void {
    this.ProjectService.getProjects().subscribe(data =>{
        this.projects = data;
  }, error => {
    console.log(error); 
  });
  }

}
