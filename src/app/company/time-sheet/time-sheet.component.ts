import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../Services/resource.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {
Resource_id =0;
projectData =[]; 
  constructor(private ResourceService:ResourceService,private router:Router) { 
this.Resource_id = Number(sessionStorage.getItem('RESOURCE_ID'));
  }

  ngOnInit(): void {
    this.getProjectData();
  }

getProjectData(){
  this.ResourceService.getRequirementData().subscribe(data =>{
    console.log(data);  
    this.projectData = data;
    }); 
}
calanderView(Project_id,requirement_id,User_id){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      Project_id: Project_id,
      Requirement_id: requirement_id, 
      User_id : User_id
    }
}
console.log(navigationExtras);
   this.router.navigate(['company/Projectmanagement/Calender'],navigationExtras); 

}

}
