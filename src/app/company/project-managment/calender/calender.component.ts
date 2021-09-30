import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopUpTimesheetComponent } from '../pop-up-timesheet/pop-up-timesheet.component';
import {ResourceService} from '../../../Services/resource.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import {MatSnackBar} from '@angular/material/snack-bar';

 
 
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  Resource_id = Number(sessionStorage.getItem('RESOURCE_ID'));
  Project_id = 0;
  Requirement_id=0;
  User_id=0; 

  Events = [];
  calendarOptions: CalendarOptions;
 
   
 
  constructor(public dialog: MatDialog,private ResourceService:ResourceService,private route: ActivatedRoute,private Router:Router,private snackBar: MatSnackBar) { 
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.Project_id = params.Project_id;
      this.Requirement_id =params.Requirement_id; 
      this.User_id = params.User_id; 
  });

  this.getTimesheetResource();
  }
    
  ngOnInit(): void {
    
  }
  getTimesheetResource(){  
    this.ResourceService.getTimesheetResource().subscribe(dataz =>{ 
      console.log(dataz);
      dataz.forEach(element => {
        var c = {
          start:startOfDay(new Date(element.Working_date)), 
          title : element.Comments,
          color: (element.Status=='Approved') ? 'green':(element.Status=='Rejected')? 'red':'blue'
        };
        this.Events.push(c); 
        
      });   
  }, error => {
    console.log(error); 
  }); 
  setTimeout(() => {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.dayClicked.bind(this),
      events: this.Events, 
      contentHeight: 600, 
    };
  }, 2500);
      
  }  

  dayClicked(e){
    
    let date = new Date(e.date);
     let entryDate = date.toLocaleDateString('zh-Hans-CN'); 
    const dialogRef = this.dialog.open(PopUpTimesheetComponent, {
      width: '450px',
      data: {entryDate: entryDate},   
    }); 
    dialogRef.afterClosed().subscribe(result => { 
     console.log(result);
     if(result.workingTime){

     var timeSheetData = { 
    "Working_date":entryDate,
    "Working_hours":result.workingTime,
    "Resource_id" : this.Resource_id,
    "Project_id" : this.Project_id,
    "Requirement_id":this.Requirement_id,
    "Comments" : result.comments,
    "User_id":this.User_id 
     }
     this.ResourceService.updateTimesheet(timeSheetData).subscribe(data =>{
      console.log(data);   
      this.openSnackBar('Time sheet submited successfully!')
      this.getTimesheetResource();
  }, error => {
    console.log(error); 
  });
}

    });

  }
  timesheetOk(){
    this.ResourceService.timesheetOk().subscribe(data =>{
      console.log(data);  
      this.getTimesheetResource();
  }, error => {
    console.log(error); 
  });

  }
  openSnackBar(message: string, action: string='') {
       this.snackBar.open(message, action, {
          duration: 1500,
       });
    }
}
