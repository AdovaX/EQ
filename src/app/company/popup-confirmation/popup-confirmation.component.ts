import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DelegateComponent } from '../../company/delegate/delegate.component';

export interface DialogData {
  name: string;
}
@Component({
  selector: 'app-popup-confirmation',
  templateUrl: './popup-confirmation.component.html',
  styleUrls: ['./popup-confirmation.component.css']
})
export class PopupConfirmationComponent implements OnInit {
  Confirmation =false;
   constructor(
     public dialogRef: MatDialogRef<DelegateComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
 
   ngOnInit(): void {
   }
   onNoClick(): void {
      
     this.dialogRef.close({ "Confirmation" :this.Confirmation});
   }
   proceed(): void {
  
     this.dialogRef.close({ "Confirmation" :true});
   }
   
   
 }
 