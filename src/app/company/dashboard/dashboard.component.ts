import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ContractorService } from '../../Services/contractor.service';
import { Contractor } from '../../class/Contractor';
import {SharedService} from '../../Services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  User_id = sessionStorage.getItem('USER_ID'); 

  constructor(private ContractorService:ContractorService,private formBuilder: FormBuilder,private SharedService:SharedService) { 
   }
  ngOnInit(): void {
     this.getProfileData();
  }
 getProfileData(){
  this.SharedService.getProfileData(this.User_id).subscribe(data =>{ 
    sessionStorage.setItem('USER_PHOTO',String(data['Profile_photo']));  
  }); 
 }

}
