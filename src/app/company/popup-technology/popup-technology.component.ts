import { Component,   OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateResourceComponent } from '../create-resource/create-resource.component';
import {ListingManagerService} from '../../Services/listing-manager.service';


export interface DialogData {
  name: string;
  Technology_category_id: Number;
}
 
@Component({
  selector: 'app-popup-technology',
  templateUrl: './popup-technology.component.html',
  styleUrls: ['./popup-technology.component.css'],
   
})
export class PopupTechnologyComponent implements OnInit {
  value =0;
  tech_list =[]; 
  tech_list2 =[]; 
   constructor(
     public dialogRef: MatDialogRef<CreateResourceComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData , private ListingManagerService:ListingManagerService) {}
 
   ngOnInit(): void {
    this.ListingManagerService.getTechnologyByParent(this.data.Technology_category_id).subscribe(data =>{
      console.log(data);   
      this.tech_list = data; 
    }); 

   }
   SubCat(Cat_id){ 
     console.log(Cat_id);
     this.ListingManagerService.getTechnologyByParent(Cat_id).subscribe(data =>{
    console.log(data);    
    this.tech_list2 = data;
  });

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
 