import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {HiringManagerService} from '../../Services/hiring-manager.service';

@Component({
  selector: 'app-search-resource',
  templateUrl: './search-resource.component.html',
  styleUrls: ['./search-resource.component.css']
})
export class SearchResourceComponent implements OnInit {
  Resource_list=[];
  HM_id= sessionStorage.getItem('HM_ID');
  constructor(private formBuilder: FormBuilder, private HiringManagerService:HiringManagerService) { }

  ngOnInit(): void {
    this.getResources(this.HM_id);

  }
  getResources(HM_id){
    var HManager_id = HM_id; 
    this.HiringManagerService.getResources(HManager_id).subscribe(data =>{
     console.log(data);  
     this.Resource_list =  data;
     });  

  }
  searchbox(event: any){
    console.log(event.target.value);
    this.HiringManagerService.searchbox(event.target.value).subscribe(data =>{
      console.log(data);  
      this.Resource_list =  data;
      }); 

  }

}
