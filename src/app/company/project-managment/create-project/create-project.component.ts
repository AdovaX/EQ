import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router"
import * as moment from 'moment';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  Project_Form: FormGroup; 
  submitted = false; 

  today = moment().format('YYYY-MM-DD'); 
  constructor(private ProjectService :ProjectService, private formBuilder: FormBuilder,private router:Router) { }

  Project_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Project_location = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Start_date = new FormControl('', [ Validators.required ]);
  End_date = new FormControl('', [ Validators.required]);
  Description = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Status = new FormControl('1', [ Validators.required ]);
  Need_remote = new FormControl('YES', [ Validators.required ]);

  ngOnInit(): void {
    this.Project_Form = this.formBuilder.group({
      Project_name : this.Project_name,
      Project_location : this.Project_location,
      Start_date : this.Start_date,
      End_date : this.End_date,
      Description : this.Description,
      Status : this.Status,
      Need_remote : this.Need_remote
    });
  }
onSubmit(){
  console.log(this.Project_Form.value);
  if (this.Project_Form.invalid) {  
    this.submitted =true;
    return;
  }else{
    this.ProjectService.createProject(this.Project_Form.value).subscribe(data =>{
        if(data['Project_id']>0){
          this.router.navigate(['company/Projectmanagement']); 

        } 
    }, error => {
      console.log(error); 
    });
  }

}
get f() { return this.Project_Form.controls; }

}
