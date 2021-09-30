import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateResourceComponent } from '../create-resource/create-resource.component';
import {SharedService} from '../../Services/shared.service';
import {ProjectService} from '../../Services/project.service';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface DialogData {
  Resource_id: Number;
  Requirement_id: Number;
}

@Component({
  selector: 'app-popup-resource-profile',
  templateUrl: './popup-resource-profile.component.html',
  styleUrls: ['./popup-resource-profile.component.css']
})
export class PopupResourceProfileComponent implements OnInit {
  value =0;
  Resource_id = 0;
  profile = [];
  panelOpenState = false;
  Role_id = Number(sessionStorage.getItem('ROLE_ID'));
  Requirement_id = 0;


   constructor(
     public dialogRef: MatDialogRef<CreateResourceComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData ,  private SharedService:SharedService, private ProjectService:ProjectService , public snackBar:MatSnackBar) {
       this.Resource_id = Number(this.data.Resource_id); 
       this.Requirement_id = Number(this.data.Requirement_id) | 0; 

     }
 
   ngOnInit(): void {
    this.getResourceProfileData()
   }
   onNoClick(): void {
      
     this.dialogRef.close();
   }
   proceed(): void {
  
     this.dialogRef.close();
   }
   getResourceProfileData(){
    this.SharedService.getResourceProfileData(this.data.Resource_id).subscribe(data =>{
      console.log(data);  
      this.profile = data;  
    });
     
   }
   addBookmark(Resource_id){ 
    this.ProjectService.addBookmark(this.Requirement_id,Resource_id).subscribe(data =>{
       if(data['Bookmark_id']){
        this.openSnackBar('Bookmark added')

      }else{
        console.log('exits');
      }
  }, error => {
    console.log(error); 
  }); 
  }
   
 openSnackBar(message: string, action: string='') {
  this.snackBar.open(message, action, {
     duration: 1500,
  });
}
 }
 