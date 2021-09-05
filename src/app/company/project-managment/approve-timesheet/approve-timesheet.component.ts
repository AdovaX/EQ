import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import { MatSort } from '@angular/material/sort';  
import { MatTableDataSource } from '@angular/material/table';  
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RejectionReasonComponent } from '../rejection-reason/rejection-reason.component';

@Component({
  selector: 'app-approve-timesheet',
  templateUrl: './approve-timesheet.component.html',
  styleUrls: ['./approve-timesheet.component.css']
})
export class ApproveTimesheetComponent implements  OnInit {
  User_id=""; 
  updateUserForm: FormGroup;  
  Role_id  = Number(sessionStorage.getItem('ROLE_ID')) | 0;

  displayedColumns: string[] = ['No','Resource_name','Approved_status','Requirement_name','Total_hours','Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }  
  constructor(private formBuilder: FormBuilder,private ProjectService:ProjectService,private snackBar: MatSnackBar,public dialog: MatDialog) { 
 
  }
  
  ngOnInit(): void { 
    this.getTimesheet();
  }
  getTimesheet(){
    this.ProjectService.getTimesheet().subscribe(data =>{
      console.log(data);
      this.dataSource.data = data;    
    });
  }
  approveTimesheet(Resource_id){

    this.ProjectService.approveTimesheet(Resource_id).subscribe(data =>{
       this.getTimesheet();
       this.openSnackBar('Success');
    });
  }
  rejectTimesheet(Resource_id){
    let Rejection_reson = "";

    const dialogRef = this.dialog.open(RejectionReasonComponent, {
      width: '450px',
      data: {}, 
      hasBackdrop: true,
      disableClose : true
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      Rejection_reson = result.Reason;
      console.log(Rejection_reson);
      this.ProjectService.rejectTimesheet(Resource_id,Rejection_reson).subscribe(data =>{
        this.getTimesheet();
        this.openSnackBar('Success');
     });
    });


   
  }
  openSnackBar(message: string, action: string='') {
    this.snackBar.open(message, action, {
       duration: 1500,
    });
 }
}
