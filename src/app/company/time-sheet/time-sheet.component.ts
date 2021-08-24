import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {
Resource_id =0;
  constructor(private ProjectService:ProjectService) { 
this.Resource_id = Number(sessionStorage.getItem('RESOURCE_ID'));
  }

  ngOnInit(): void {
  }

getRequirementData(){
  this.ProjectService.getRequirementData(this.Resource_id).subscribe(data =>{
    console.log(data);   
    }); 
}

}
