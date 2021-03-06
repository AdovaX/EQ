import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {SpocService} from '../../Services/spoc.service';
import {PopupConfirmationComponent} from '../popup-confirmation/popup-confirmation.component';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-listing-manager',
  templateUrl: './create-listing-manager.component.html',
  styleUrls: ['./create-listing-manager.component.css']
})
export class CreateListingManagerComponent implements OnInit {
  LM_Form: FormGroup;
  isUpdated = false;
  submitted = false;
  LM_Data = []; 
  fieldTextType: boolean;
  constructor(private formBuilder: FormBuilder, private SpocService:SpocService,private dialog:MatDialog) { }

  LM_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  LM_email = new FormControl('', [ Validators.required, Validators.email]);
  LM_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  LM_phone =new FormControl('', [ Validators.required, Validators.minLength(10)]);
  LM_password = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  LM_password2 = new FormControl('', [ Validators.required, Validators.minLength(2)]);
   ngOnInit(): void {
    this.getLManagerList();
    this.LM_Form = this.formBuilder.group({
      LM_fullname : this.LM_fullname,
      LM_email : this.LM_email,
      LM_designation : this.LM_designation,
      LM_phone : this.LM_phone, 
      LM_password : this.LM_password,  
      LM_password2 : this.LM_password2,   
  
    }); 
  } 
  get f() { return this.LM_Form.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.LM_Form.invalid) {  
      return;
    }else if(this.LM_Form.value.LM_password != this.LM_Form.value.LM_password2 ){
      alert("Password do not match!");
    }
    else{
      this.SpocService.createLManager(this.LM_Form.value).subscribe(data =>{
        console.log(data);
        this.isUpdated = true;
        this.getLManagerList(); 
     
      }); 
    }
  }
  getLManagerList(){
    this.SpocService.getListingManagers().subscribe(data =>{
      console.log(data);  

      let LManagersList =[];
      for (var i = 0; i < data.length; i++) {
        var e = {
          "User_firstname" : data[i]['User_firstname'],
          "User_email" : data[i]['User_email'] ,
          "User_designation" : data[i]['User_designation'],
          "User_phonenumber" : data[i]['User_phonenumber'], 
          "User_id" : data[i]['User_id'],
        }
        LManagersList.push(e);
      }  
    this.LM_Data  = LManagersList;
   
    }); 

  } 

  deleteLM(LM_id){ 
    const dialogRef = this.dialog.open(PopupConfirmationComponent, {
      width: '450px',
      data: {name: 'Are you sure ?'},
      hasBackdrop: true,
      disableClose : true
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      if(result.Confirmation){
        this.SpocService.deleteLM(LM_id).subscribe(data =>{
          console.log(data);  
          this.getLManagerList(); 
        });   
     } 
    });   
 }

  resetForm(){ 
    this.LM_Form.reset();  
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
