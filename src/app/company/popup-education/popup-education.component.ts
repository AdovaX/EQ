import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateResourceComponent } from '../create-resource/create-resource.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-popup-education',
  templateUrl: './popup-education.component.html',
  styleUrls: ['./popup-education.component.css']
})
export class PopupEducationComponent implements OnInit {
  value =0;
   constructor(
     public dialogRef: MatDialogRef<CreateResourceComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
 
   ngOnInit(): void {
   }
   onNoClick(): void {
      
     this.dialogRef.close({ "Qualification" :this.data.name, "Passout_year" : 0 });
   }
   proceed(): void {
  
     this.dialogRef.close({ "Qualification" :this.data.name, "Passout_year" : this.value });
   }
   getData(e){
     this.value = e.target.value;
   }
 
   
 }
 