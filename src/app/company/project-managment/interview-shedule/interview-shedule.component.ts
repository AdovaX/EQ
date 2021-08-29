import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router"
import {SharedService} from '../../../Services/shared.service';

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

  interviewForm: FormGroup; 
  Company_name: any;
  User_designation: any;
  User_firstName: any;
  User_secondName: any;
  constructor(private SharedService:SharedService, private route: ActivatedRoute,private formBuilder: FormBuilder,private ProjectService:ProjectService,private snackBar: MatSnackBar,private router:Router) {
    this.route.queryParams.subscribe(params => {
        console.log(params);
        this.NAME = params.name;
        this.Requirement_id =params.r_id;
        this.Resource_id =params.code;
         

    });
}

bodymail = new FormControl('', [ Validators.required, Validators.minLength(3)]);
interviewDate = new FormControl(this.todaysDate, [ Validators.required ]);
interviewTime = new FormControl('10:00', [ Validators.required ]);

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
      console.log(this.interviewForm.value); 
      this.ProjectService.mailInterview(this.Requirement_id,this.Resource_id,this.interviewForm.value).subscribe(data =>{
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
    console.log(data); 
   let companyData =data['CompanyTb'];
   let userData =data;   

   this.Company_name = companyData.C_full_name; 
   this.User_designation = userData['User_designation'];
   this.User_firstName = userData['User_firstname'];
   this.User_secondName = userData['User_secondName'];
 

   this.emailBody = 'Dear '+ this.NAME +',<br><br> '+this.User_firstName+' from '+this.Company_name+' has viewed your profile and found you to be an appropriate match.';
    this.emailBody+='He / She would like to schedule an interview with you.Proposed interview date: '+this.interviewForm.get('interviewDate').value+' and time: '+this.interviewForm.get('interviewTime').value +'.';
    this.emailBody+='<br>For project details <a href="http://expertsq.com"><i>click here</i></a>';

    this.interviewForm.controls.bodymail.setValue(this.emailBody); 

   });
}
 
}
