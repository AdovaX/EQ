import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {ListingManagerService} from '../../../Services/listing-manager.service';
import { MatSort } from '@angular/material/sort'; 

import { MatTableDataSource } from '@angular/material/table'; 

import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-approved-resources',
  templateUrl: './approved-resources.component.html',
  styleUrls: ['./approved-resources.component.css']
})
export class ApprovedResourcesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private ProjectService:ProjectService,private ListingManagerService:ListingManagerService) { }

  displayedColumns: string[] = ['No','Resource_name','Requirement_name','Requirement_start','C_short_name' ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }  
  ngOnInit(): void { 
    this.getapprovedResources();
  }
  getapprovedResources(){
    this.ListingManagerService.listofApprovedResources().subscribe(data =>{
      console.log(data); 
      this.dataSource.data = data;   
    
    });
  }
}
