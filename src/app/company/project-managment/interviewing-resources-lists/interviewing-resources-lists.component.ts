import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import { MatSort } from '@angular/material/sort'; 
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table'; 

import {MatPaginator} from '@angular/material/paginator';
import { PopupRejectReasonComponent } from '../popup-reject-reason/popup-reject-reason.component';

@Component({
  selector: 'app-interviewing-resources-lists',
  templateUrl: './interviewing-resources-lists.component.html',
  styleUrls: ['./interviewing-resources-lists.component.css']
})
export class InterviewingResourcesListsComponent implements OnInit {
  User_id=""; 
  updateUserForm: FormGroup; 
  Interview_status=[{
    value:'SELECTED',viewValue:'SELECTED'
  },
  {
    value : 'REJECTED',viewValue:'REJECTED'
  },  
  {
    value : 'NOINTREST',viewValue:'NOT INTRESTED'
  }, 
  {
    value : 'INTERVIEWING',viewValue:'INTERVIEWING'
  }];

  displayedColumns: string[] = ['No','Resource_name','Resource_Designation','Interview_date','Interview_time','Interview_status','Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }  
  constructor(private formBuilder: FormBuilder,private ProjectService:ProjectService,public dialog: MatDialog) { 

    this.User_id = sessionStorage.getItem('USER_ID');
  }
 

  ngOnInit(): void {
    
    this.getInterviewResources();
  }
  getInterviewResources(){
    this.ProjectService.getInterviewResources().subscribe(data =>{
      this.dataSource.data = data;    
    });
  }
  interviewStatus(e,resource_id,requirement_id){
    console.log(e.value);
    let Reason = "";
    if(e.value == 'REJECTED'){
      const dialogRef = this.dialog.open(PopupRejectReasonComponent, {
        width: '450px',
        data: {name:''}, 
        hasBackdrop: true,
        disableClose : true
      }); 
      dialogRef.afterClosed().subscribe(result => { 
        Reason = result.reason;
        console.log(Reason);
        
      });

    }
    this.ProjectService.changeInterviewStatus(e.value,resource_id,requirement_id,Reason).subscribe(data =>{
      console.log(data);  
      this.getInterviewResources(); 
    });
  }
}
