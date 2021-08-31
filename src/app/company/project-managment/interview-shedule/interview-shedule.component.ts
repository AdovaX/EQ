import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router"
import {SharedService} from '../../../Services/shared.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-interview-shedule',
  templateUrl: './interview-shedule.component.html',
  styleUrls: ['./interview-shedule.component.css']
})
export class InterviewSheduleComponent implements OnInit {
NAME ="";
Requirement_id=0;
Resource_id=0;
emailBody="";
User_id = sessionStorage.getItem('USER_ID');
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0');  
  yyyy = this.today.getFullYear();
  todaysDate =this.yyyy + '-' + this.dd + '-' + this.mm;
  displayDate = this.mm+'/'+this.dd+'/'+this.yyyy;
  interviewForm: FormGroup; 
  Company_name: any;
  User_designation: any;
  User_firstName: any;
  User_secondName: any;
   currentYear = new Date().getFullYear();
   minDate = new Date(this.currentYear, Number(this.mm), Number(this.dd)); 
  mailDate = this.mm+'/'+this.dd+'/'+this.yyyy; 

  mailTime =   new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
   
  constructor(private SharedService:SharedService, private route: ActivatedRoute,private formBuilder: FormBuilder,private ProjectService:ProjectService,private snackBar: MatSnackBar,private router:Router) {
    this.route.queryParams.subscribe(params => {
        console.log(params);
        this.NAME = params.name;
        this.Requirement_id =params.r_id;
        this.Resource_id =params.code;
         

    });
}

bodymail = new FormControl('', [ Validators.required, Validators.minLength(3)]);
interviewDate = new FormControl('', [ Validators.required ]);
interviewTime = new FormControl(this.mailTime, [ Validators.required ]);

  ngOnInit(): void {
    this.getProfileData(this.User_id);
 
    this.interviewForm = this.formBuilder.group({
      bodymail : this.bodymail,  
      interviewDate : this.interviewDate,  
      interviewTime : this.interviewTime,  
    });
     
  }
  mailInterview(){
    if(this.interviewForm.invalid){
      console.log("Form error" + this.interviewForm.errors); 
      return;
    }else{  
      this.ProjectService.mailInterview(this.Requirement_id,this.Resource_id,this.interviewForm.value).subscribe(data =>{
        console.log('----'); 
        console.log(data);   
        if(data['Status']==true){ 
          this.openSnackBar('Interview call latter sent!');
          setTimeout(() => {
            this.router.navigate(['/Projectmanagement/Interviewing']);
        }, 3000);
        } 
      });

    }
  }
  openSnackBar(message: string, action: string='') {
    this.snackBar.open(message, action, {
       duration: 1500,
    });
 }
 getProfileData(id){
  var User_id = id;
  this.SharedService.getProfileData(User_id).subscribe(data =>{
   let companyData =data['CompanyTb'];
   let userData =data;   

   this.Company_name = companyData.C_full_name; 
   this.User_designation = userData['User_designation'];
   this.User_firstName = userData['User_firstname'];
   this.User_secondName = userData['User_secondName'];

   let d =this.mailDate;
   d = formatDate(d,'dd/MM/yyyy','en-US');

   let t = this.mailTime;
    

   this.emailBody = 'Dear '+ this.NAME +',<br><br> '+this.User_firstName+' from '+this.Company_name+' has viewed your profile and found you to be an appropriate match.';
    this.emailBody+='He / She would like to schedule an interview with you.Proposed interview date: '+d +' and time: '+t +'.';
    this.emailBody+='<br>For project details <a href="http://expertsq.com"><i>click here</i></a>';

    this.interviewForm.controls.bodymail.setValue(this.emailBody); 

   });
}
dateChange(e){
  console.log("Date changed");
  console.log(e);
  this.mailDate = e;
  this.getProfileData(this.User_id);
}
timeChange(e){
  console.log("Time changed");
  console.log(e);

  var ts = e;
  var H = +ts.substr(0, 2);
  var h = (H % 12) || 12;
  h = Number((h < 10)?("0"+h):h);  // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm; 
  this.mailTime = ts;
  this.getProfileData(this.User_id);

}
}
