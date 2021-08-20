import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
projects=[];
n =1;

today = moment().format('YYYY-MM-DD'); 
@ViewChild(MatSort) sort: MatSort; 
@ViewChild(MatPaginator) paginator: MatPaginator;
dataSource = new MatTableDataSource();

displayedColumns: string[] = ['No','Status','Project_name', 'Start_date', 
'End_date','Remaining','Project_location','Action'];

ngAfterViewInit() { 
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;

} 

  constructor(private ProjectService :ProjectService , private Router:Router) { }

  ngOnInit(): void {
    this.ProjectService.getProjects().subscribe(data =>{
      console.log(data);
        this.projects = data;
        this.dataSource.data=data;
  }, error => {
    console.log(error); 
  });
  }
  createAssignment(Project_id){
     this.Router.navigate(['/company/Projectmanagement/Createassignment',Project_id]); 
 
  }
  gotoAssignment(Project_id){
     this.Router.navigate(['/company/Projectmanagement/Requirements',Project_id]); 
 
  }
  gotoProject(Project_id){
    this.Router.navigate(['/company/Projectmanagement/ProjectDetails',Project_id]); 

  }
  toogleActive(Project_id , currentValue){
    if(currentValue == 1){
      currentValue =0;
    }else{ 
     currentValue =1;
 
    }
   this.ProjectService.toogleActive(Project_id,currentValue).subscribe(data =>{
     console.log(data);   
     this.ngOnInit();
   
   });
  }

  updateStart(e,Project_id){
    let fromDate = e.value;
    fromDate =  moment(fromDate).format('YYYY-MM-DD');
    console.log(fromDate);
    this.ProjectService.updateStart(fromDate,Project_id).subscribe(data =>{
      console.log(data); 
      this.ngOnInit();  
   
    });

  }
  updateEnd(e,Project_id){
    let toDate = e.value;
    toDate =  moment(toDate).format('YYYY-MM-DD');
    console.log(toDate);
    this.ProjectService.updateEnd(toDate,Project_id).subscribe(data =>{
      console.log(data);  
      this.ngOnInit(); 
   
    });
  }

}
