import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../Services/project.service';
import {NavigationExtras, Router} from "@angular/router";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-short-listed-resources',
  templateUrl: './short-listed-resources.component.html',
  styleUrls: ['./short-listed-resources.component.css']
})
export class ShortListedResourcesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  
  displayedColumns: string[] = ['No','Resource_name','Resource_Designation','Resource_rate','Available_from','Available_to','Action' ];
  
  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  
  } 
  constructor(private ProjectService :ProjectService , private Router:Router) { }

  ngOnInit(): void {
    this.ProjectService.getShortListResource().subscribe(data =>{
      console.log(data); 
        this.dataSource.data=data;
  }, error => {
    console.log(error); 
  });
  }
  setInterview(Resource_id: any,Resource_names: any,Requirement_id: any){
console.log("Set interview");
    let navigationExtras: NavigationExtras = {
      queryParams: {
          name: Resource_names,
          code: Resource_id,
          r_id:Requirement_id
      }
  }
  this.Router.navigate(['company/Projectmanagement/InterviewShedule'], navigationExtras);

  }
}
