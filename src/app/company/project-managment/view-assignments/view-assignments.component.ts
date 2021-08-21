import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router";
import { MatSort } from '@angular/material/sort'; 
import { MatTableDataSource } from '@angular/material/table'; 
import {MatPaginator} from '@angular/material/paginator'; 
import * as moment from 'moment';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit {
  Project_id;
  assignmentLists=[];
  projectName ="";
  today = moment().format('YYYY-MM-DD'); 
  @ViewChild(MatSort) sort: MatSort; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No','Requirement_name','No_of_resources','Hours_per_day','Hours_per_week','Hours_per_month','Action'];
  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  
  } 
  constructor(  private _Activatedroute:ActivatedRoute,private Router:Router, private ProjectService :ProjectService, private formBuilder: FormBuilder,private router:Router) { 
    this.Project_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));
   
  }

  ngOnInit(): void {
  this.getProjectById();
  this.getAssignments();
  }
  getAssignments(){
  this.ProjectService.getAssignmentsById(this.Project_id).subscribe(data =>{ 
    this.assignmentLists = data;
    this.dataSource.data=data; 
  }, error => {
  console.log(error); 
  });
  }
  getProjectById(){
  this.ProjectService.getProjectById(this.Project_id).subscribe(data =>{ 
    this.projectName=data['Project_name'];
  }, error => {
  console.log(error); 
  });
  }
createAssignment(){
  this.Router.navigate(['/company/Projectmanagement/Createassignment',this.Project_id]); 

}
findMatching(id){ 

  this.router.navigate(['company/Projectmanagement/Findmaching',id]); 

}
}
