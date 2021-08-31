import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProjectService} from '../../../Services/project.service';
import {Router,NavigationExtras } from "@angular/router";
import { MatSort } from '@angular/material/sort'; 
import { MatTableDataSource } from '@angular/material/table'; 
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupInterviewDateComponent } from '../popup-interview-date/popup-interview-date.component';

@Component({
  selector: 'app-find-maching',
  templateUrl: './find-maching.component.html',
  styleUrls: ['./find-maching.component.css']
})
export class FindMachingComponent implements OnInit {
  Requirement_id;
  Resource_list=[];
  noResource = false;

  displayedColumns: string[] = ['No','Matching','Resource_name','Resource_rate','Available_from','Available_to','Status','Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  } 
  constructor(private _Activatedroute:ActivatedRoute,private router: Router,private ProjectService :ProjectService,private snackBar: MatSnackBar,public dialog: MatDialog) { 
    this.Requirement_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));

  }
 openSnackBar(message: string, action: string='') {
      this.snackBar.open(message, action, {
         duration: 1500,
      });
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
      this.dataSource =data;
    }
    
}, error => {
  console.log(error); 
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
  setInterview(Resource_id,Resource_names){

    let navigationExtras: NavigationExtras = {
      queryParams: {
          name: Resource_names,
          code: Resource_id,
          r_id:this.Requirement_id
      }
  }
  this.router.navigate(['company/Projectmanagement/InterviewShedule'], navigationExtras);

  }
  shortList(Resource_id){
    this.ProjectService.shortListResource(Resource_id,this.Requirement_id).subscribe(data =>{
      console.log(data);
      if(data[1]){
        this.openSnackBar('Success | Short listed');
      }else{
        this.openSnackBar('Already short listed');
      } 
 }, error => {
   console.log(error); 
 }); 

  }
   
}
