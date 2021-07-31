import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-find-maching',
  templateUrl: './find-maching.component.html',
  styleUrls: ['./find-maching.component.css']
})
export class FindMachingComponent implements OnInit {
  Requirement_id;
  Resource_list=[];
  noResource = false;
  constructor(private _Activatedroute:ActivatedRoute,private ProjectService :ProjectService) { 
    this.Requirement_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));

  }

  ngOnInit(): void {

    this.getMatchingProfiles();
   
  }
  getMatchingProfiles(){
    this.ProjectService.machingResources(this.Requirement_id).subscribe(data =>{
    console.log(data);
      
    if(data.status == false){ 
      console.log("No resources");
      this.noResource =true;
    }else{
      this.noResource =false;
      console.log("Resources found" + Object.keys(data).length);
      this.Resource_list =data;
    }
    
}, error => {
  console.log(error); 
});
  }

}
