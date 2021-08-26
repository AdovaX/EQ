import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
 
@Component({
  selector: 'app-interview-shedule',
  templateUrl: './interview-shedule.component.html',
  styleUrls: ['./interview-shedule.component.css']
})
export class InterviewSheduleComponent implements OnInit {
NAME ="";
Requirement_id=0;
Resource_id=0;
interviewForm: FormGroup; 
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,private ProjectService:ProjectService) {
    this.route.queryParams.subscribe(params => {
        console.log(params);
        this.NAME = params.name;
        this.Requirement_id =params.r_id;
        this.Resource_id =params.code;
    });
}
bodymail = new FormControl('', [ Validators.required, Validators.minLength(3)]);
interviewDate = new FormControl('', [ Validators.required ]);
interviewTime = new FormControl('10:00', [ Validators.required ]);

  ngOnInit(): void {
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
      
      });

    }
  }
  test(e){
console.log(e);
  }
}
