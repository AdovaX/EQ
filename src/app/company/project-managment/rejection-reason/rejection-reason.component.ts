import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApproveTimesheetComponent } from '../approve-timesheet/approve-timesheet.component';

export interface DialogData {
  name: string;
}
@Component({
  selector: 'app-rejection-reason',
  templateUrl: './rejection-reason.component.html',
  styleUrls: ['./rejection-reason.component.css']
})
export class RejectionReasonComponent implements OnInit {
  value ="";
   constructor(
     public dialogRef: MatDialogRef<ApproveTimesheetComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
 
   ngOnInit(): void {
   }  
  onNoClick(): void {
      
    this.dialogRef.close({ "Reason" :this.value });
  }
  proceed(): void { 
    this.dialogRef.close({ "Reason" :this.value});
  }
  getReason(e){
this.value = e.target.value;
  }
}
