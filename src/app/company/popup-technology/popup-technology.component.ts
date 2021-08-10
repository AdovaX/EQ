import { Component,   OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateResourceComponent } from '../create-resource/create-resource.component';
import {ListingManagerService} from '../../Services/listing-manager.service';


export interface DialogData {
  Technology_name: string;
  Technology_experience: Number;
  Technology_level: string;
  Technology_version: string;
}
 
@Component({
  selector: 'app-popup-technology',
  templateUrl: './popup-technology.component.html',
  styleUrls: ['./popup-technology.component.css'],
   
})
export class PopupTechnologyComponent implements OnInit {
  value =0;
  tech_list =[]; 
  Technology_name =""; 
  Technology_experience =0; 
  Technology_version =0; 
  Technology_level =""; 
   constructor(
     public dialogRef: MatDialogRef<CreateResourceComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData , private ListingManagerService:ListingManagerService) {}
 
   ngOnInit(): void {
    this.Technology_name=this.data.Technology_name;

   } 
   onNoClick(): void {
      
     this.dialogRef.close({ "Technology_name" :this.data.Technology_name, "Technology_experience" : "",
     "Technology_level":"","Technology_version":""});
   }
   proceed(): void {
  
     this.dialogRef.close({ "Technology_name" :this.data.Technology_name, "Technology_experience" : this.Technology_experience,
     "Technology_level":this.Technology_level,"Technology_version":this.Technology_version });
   }
   getexperience(e){
     this.Technology_experience = e.target.value;
   }
   getlevel(e){
     this.Technology_level = e.value;
   }
   getversion(e){
    this.Technology_version = e.target.value;

   }
 
   
 }
 