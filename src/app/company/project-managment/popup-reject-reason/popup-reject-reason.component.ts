import { Component, OnInit } from '@angular/core';
  import { Inject} from '@angular/core';
  import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
  import { InterviewingResourcesListsComponent } from '../interviewing-resources-lists/interviewing-resources-lists.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-popup-reject-reason',
  templateUrl: './popup-reject-reason.component.html',
  styleUrls: ['./popup-reject-reason.component.css']
})
export class PopupRejectReasonComponent implements OnInit {
  value =0;
  reason= "";
   constructor(
     public dialogRef: MatDialogRef<InterviewingResourcesListsComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
 
   ngOnInit(): void {
   }
    onNoClick(): void {
        
      this.dialogRef.close({ "reason" :this.reason,  });
    }
    proceed(): void {
    
      this.dialogRef.close({ "reason" :this.reason,  });
    }
   getData(e){
     this.reason = e.target.value;
   }
 
   
 }
 