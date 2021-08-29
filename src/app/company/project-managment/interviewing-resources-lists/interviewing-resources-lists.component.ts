import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import { MatSort } from '@angular/material/sort'; 

import { MatTableDataSource } from '@angular/material/table'; 

import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-interviewing-resources-lists',
  templateUrl: './interviewing-resources-lists.component.html',
  styleUrls: ['./interviewing-resources-lists.component.css']
})
export class InterviewingResourcesListsComponent implements OnInit {
  User_id=""; 
  updateUserForm: FormGroup; 
  Interview_status=[{
    value:'PASSED',viewValue:'PASSED'
  },
  {
    value : 'FAILLED',viewValue:'FAILLED'
  },
  {
    value : 'PENDING',viewValue:'PENDING'
  },
  {
    value : 'SHORTLIST',viewValue:'SHORTLIST'
  },
  {
    value : 'CANCEL',viewValue:'CANCEL'
  }];

  displayedColumns: string[] = ['No','Resource_name','Resource_Designation','Interview_date','Interview_time','Interview_status','Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }  
  constructor(private formBuilder: FormBuilder,private ProjectService:ProjectService) { 

    this.User_id = sessionStorage.getItem('USER_ID');
  }
 

  ngOnInit(): void {
    
    this.getInterviewResources();
  }
  getInterviewResources(){
    this.ProjectService.getInterviewResources().subscribe(data =>{
      console.log(data); 
      this.dataSource.data = data;   
    
    });
  }
  interviewStatus(e,resource_id,requirement_id){
    console.log(e.value);
    this.ProjectService.changeInterviewStatus(e.value,resource_id,requirement_id).subscribe(data =>{
      console.log(data);  
      this.getInterviewResources(); 
    });
  }
}
