import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CalenderComponent } from '../calender/calender.component';
export interface DialogData {
  name: string;
  entryDate:string
}
@Component({
  selector: 'app-pop-up-timesheet',
  templateUrl: './pop-up-timesheet.component.html',
  styleUrls: ['./pop-up-timesheet.component.css']
})
export class PopUpTimesheetComponent implements OnInit {
  value =0;
  entryDate="";
  workingTime=0;
  comments="";

  constructor(
    public dialogRef: MatDialogRef<CalenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.entryDate = data.entryDate;
    }

  ngOnInit(): void {
  }
  onNoClick(): void {
     
    this.dialogRef.close({ "workingTime" :this.workingTime, "comments" : this.comments });
  }
  proceed(): void {
 
    this.dialogRef.close({ "workingTime" :this.workingTime, "comments" : this.comments });
  }
  workingtime(e){
    this.workingTime = e.target.value; 
  }
  getComment(e){
    this.comments = e.target.value; 
  }
}
