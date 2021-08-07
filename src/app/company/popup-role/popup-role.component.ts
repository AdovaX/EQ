import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateResourceComponent } from '../create-resource/create-resource.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-popup-role',
  templateUrl: './popup-role.component.html',
  styleUrls: ['./popup-role.component.css']
})
export class PopupRoleComponent implements OnInit {
  value =0;
   constructor(
     public dialogRef: MatDialogRef<CreateResourceComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
 
   ngOnInit(): void {
   }
   onNoClick(): void {
      
     this.dialogRef.close({ "Role" :this.data.name, "Experience" : 0 });
   }
   proceed(): void {
  
     this.dialogRef.close({ "Role" :this.data.name, "Experience" : this.value });
   }
   getData(e){
     this.value = e.target.value;
   }
 
   
 }
 