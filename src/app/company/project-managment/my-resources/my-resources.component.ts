import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import { MatSort } from '@angular/material/sort'; 

import { MatTableDataSource } from '@angular/material/table'; 

import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-my-resources',
  templateUrl: './my-resources.component.html',
  styleUrls: ['./my-resources.component.css']
})
export class MyResourcesComponent implements  OnInit {
  User_id=""; 
  updateUserForm: FormGroup;  

  displayedColumns: string[] = ['No','Resource_name','Approved_status','Requirement_name','Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }  
  constructor(private formBuilder: FormBuilder,private ProjectService:ProjectService) { 
 
  }
  
  ngOnInit(): void { 
    this.getapprovedResources();
  }
  getapprovedResources(){
    this.ProjectService.getapprovedResources().subscribe(data =>{
      console.log(data);
      this.dataSource.data = data;    
    });
  }
   
}
