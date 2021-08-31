import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../Services/resource.service';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {
Resource_id =0;
  constructor(private ResourceService:ResourceService) { 
this.Resource_id = Number(sessionStorage.getItem('RESOURCE_ID'));
  }

  ngOnInit(): void {
    this.getProjectData();
  }

getProjectData(){
  this.ResourceService.getRequirementData().subscribe(data =>{
    console.log(data);   
    }); 
}

}
