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
  constructor(private _Activatedroute:ActivatedRoute,private ProjectService :ProjectService) { 
    this.Requirement_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));

  }

  ngOnInit(): void {
   
  }
  getMatchingProfiles(){
    
  }

}
