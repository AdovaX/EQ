import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupResourceProfileComponent } from '../../popup-resource-profile/popup-resource-profile.component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  
  displayedColumns: string[] = ['No','Resource_name','Resource_Designation','Resource_rate','Available_from','Available_to','Action' ];
  
  ngAfterViewInit() { 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  
  } 
  constructor(private ProjectService :ProjectService , private Router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ProjectService.getBookmark().subscribe(data =>{
      console.log(data); 
        this.dataSource.data=data;
  }, error => {
    console.log(error); 
  });
  }
  removeBookmark(Resource_id){
    this.ProjectService.removeBookmark(Resource_id).subscribe(data =>{
      console.log(data); 
      this.ngOnInit();
  }, error => {
    console.log(error); 
  });
  }
  viewResourceProfile(id){
    console.log(id);
      const dialogRef = this.dialog.open(PopupResourceProfileComponent, {
        width: '650px',
        data: {Resource_id: id}, 
        hasBackdrop: true,
        disableClose : false
      }); 
      dialogRef.afterClosed().subscribe(result => { 
        
      }); 
    }
}
