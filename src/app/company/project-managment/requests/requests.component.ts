import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {ListingManagerService} from '../../../Services/listing-manager.service';
import { MatSort } from '@angular/material/sort'; 

import { MatTableDataSource } from '@angular/material/table'; 

import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private ProjectService:ProjectService,private ListingManagerService:ListingManagerService) { }

  displayedColumns: string[] = ['No','Resource_name','Requirement_name','Requirement_start','C_short_name','Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }  
  ngOnInit(): void {
    this.resourceRequests();
  }
  resourceRequests(){
    this.ListingManagerService.resourceRequests().subscribe(data =>{
      console.log(data); 
      this.dataSource.data = data;   
    
    });
  }
  approveResources(Resource_id,Requirement_id){
    this.ListingManagerService.approveResources(Resource_id,Requirement_id).subscribe(data =>{
      console.log(data);     
    
    });
  }
}
