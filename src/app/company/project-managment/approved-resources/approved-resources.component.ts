import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {ListingManagerService} from '../../../Services/listing-manager.service';
import { MatSort } from '@angular/material/sort'; 

import { MatTableDataSource } from '@angular/material/table'; 
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {MatPaginator} from '@angular/material/paginator';
import { PopupResourceProfileComponent } from '../../popup-resource-profile/popup-resource-profile.component';
@Component({
  selector: 'app-approved-resources',
  templateUrl: './approved-resources.component.html',
  styleUrls: ['./approved-resources.component.css']
})
export class ApprovedResourcesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private ProjectService:ProjectService,private ListingManagerService:ListingManagerService,public dialog: MatDialog) { }

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
  viewResourceProfile(id){
    console.log(id);
      const dialogRef = this.dialog.open(PopupResourceProfileComponent, {
        width: '650px',
        data: {Resource_id: id ,Requirement_id : 0}, 
        hasBackdrop: true,
        disableClose : false
      }); 
      dialogRef.afterClosed().subscribe(result => { 
        
      }); 
    }
}
