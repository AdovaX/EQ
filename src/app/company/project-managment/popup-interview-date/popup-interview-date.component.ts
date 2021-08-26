import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject} from '@angular/core';
import { FindMachingComponent } from '../find-maching/find-maching.component';

export interface DialogData {
  name: string;
}
@Component({
  selector: 'app-popup-interview-date',
  templateUrl: './popup-interview-date.component.html',
  styleUrls: ['./popup-interview-date.component.css']
})
export class PopupInterviewDateComponent implements OnInit {
  value =0;
   constructor(
     public dialogRef: MatDialogRef<FindMachingComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
 
   ngOnInit(): void {
   }
   onNoClick(): void {
      
     this.dialogRef.close({ "Domain" :this.data.name, "Experience" : 0 });
   }
   proceed(): void {
  
     this.dialogRef.close({ "Domain" :this.data.name, "Experience" : this.value });
   }
   getData(e){
     this.value = e.target.value;
   }
 
   
 }
 