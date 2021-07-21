import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit {
  Project_id;
  assignmentLists=[];
  constructor(  private _Activatedroute:ActivatedRoute,private ProjectService :ProjectService, private formBuilder: FormBuilder,private router:Router) { 
    this.Project_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));
   
  }

  ngOnInit(): void {
  this.getAssignments();
  }
getAssignments(){
this.ProjectService.getAssignmentsById(this.Project_id).subscribe(data =>{
  this.assignmentLists = data;
  console.log(data);
}, error => {
console.log(error); 
});
}
findMatching(id){ 

  this.router.navigate(['L5Dashboard/Projectmanagement/Findmaching',id]); 

}
}
