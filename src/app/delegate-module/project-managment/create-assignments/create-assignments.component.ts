 import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import {ProjectService} from '../../../Services/project.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-create-assignments',
  templateUrl: './create-assignments.component.html',
  styleUrls: ['./create-assignments.component.css']
})
export class CreateAssignmentsComponent implements OnInit {
  Project_id;
  Requirement_Form: FormGroup; 
  submitted = false; 
  domainsList=[];
  rolesList=[];
  technologiesList=[];
  educationsList=[];
  selectedTechnologies=[];
  selectedDomains=[];
  selectedEducation=[];
  selectedRoles=[];
  User_id;
  mainTech=[];
  constructor(  private _Activatedroute:ActivatedRoute,private ProjectService :ProjectService, private formBuilder: FormBuilder,private Router:Router) { 
    this.Project_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));
    this.User_id = sessionStorage.getItem('USER_ID');  
  }

  Project_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Requirement_name = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Week_duration = new FormControl('', [ Validators.required ]);
  Week_must_time = new FormControl('', [ Validators.required]);
  Technology_id = new FormControl(this.selectedTechnologies );
  Domain_id = new FormControl('' );
  Roles_id = new FormControl('' );
  Certification = new FormControl('' );
  Hours_per_week = new FormControl('', [ Validators.required ]);
  Hours_per_month = new FormControl('', [ Validators.required ]);
  Hours_per_day = new FormControl('', [ Validators.required ]);
  No_of_resources = new FormControl('', [ Validators.required ]);
  Requirements_description = new FormControl('', [ Validators.required ]);
  ProjectId = new FormControl('');

  ngOnInit(): void {
    this.findProject();
    this.getDomains();
    this.getEducation();
    this.getTechnology();
    this.getRoles();
    this.Requirement_Form = this.formBuilder.group({
      Project_name : this.Project_name,
      Requirement_name : this.Requirement_name,
      Week_duration : this.Week_duration,
      Week_must_time : this.Week_must_time,
      Technology_id : this.formBuilder.array([]),
      Domain_id : this.formBuilder.array([]),
      Roles_id : this.formBuilder.array([]),
      Certification : this.formBuilder.array([]),
      Hours_per_week : this.Hours_per_week,
      Hours_per_month : this.Hours_per_month,
      Hours_per_day : this.Hours_per_day,
      No_of_resources : this.No_of_resources,
      Requirements_description : this.Requirements_description, 
      ProjectId :this.ProjectId
    });
  }
   

selectTech(e){    
if (e.target.checked) {
console.log("checked");
this.selectedTechnologies.push(e.target.value);
}else{
console.log("unchecked");
this.selectedTechnologies = this.selectedTechnologies.filter(m=>m!==e.target.value);
}
console.log(this.selectedTechnologies);
}

selectDomain(e){    
if (e.target.checked) {
console.log("checked");
this.selectedDomains.push(e.target.value);
}else{
console.log("unchecked");
this.selectedDomains = this.selectedDomains.filter(m=>m!==e.target.value);
}
console.log(this.selectedDomains);
}

selectEducation(e){    
  if (e.target.checked) {
  console.log("checked");
  this.selectedEducation.push(e.target.value);
  }else{
  console.log("unchecked");
  this.selectedEducation = this.selectedEducation.filter(m=>m!==e.target.value);
  }
  console.log(this.selectedEducation);
  }

  selectRole(e){    
  if (e.target.checked) {
  console.log("checked");
  this.selectedRoles.push(e.target.value);
  }else{
  console.log("unchecked");
  this.selectedRoles = this.selectedRoles.filter(m=>m!==e.target.value);
  }
  console.log(this.selectedRoles);
  }

private pushTechnologies(): FormGroup {
  return new FormGroup({
    'Technologies': new FormControl(this.selectedTechnologies) 
  })
}
private pushDomains(): FormGroup {
  return new FormGroup({
    'Domains': new FormControl(this.selectedDomains) 
  })
}
private pushEducations(): FormGroup {
  return new FormGroup({
    'Education': new FormControl(this.selectedEducation) 
  })
}
private pushRoles(): FormGroup {
  return new FormGroup({
    'Roles': new FormControl(this.selectedRoles) 
  })
}
  
onSubmit(){
  const Techs = this.Requirement_Form.get('Technology_id') as FormArray;
  Techs.push(this.pushTechnologies());

  const Domins = this.Requirement_Form.get('Domain_id') as FormArray;
  Domins.push(this.pushDomains());

  const Educations = this.Requirement_Form.get('Certification') as FormArray;
  Educations.push(this.pushEducations());

  const Roles = this.Requirement_Form.get('Roles_id') as FormArray;
  Roles.push(this.pushRoles());

  this.Requirement_Form.patchValue({ProjectId:this.Project_id})
  
  console.log(this.Requirement_Form.value);

  if (this.Requirement_Form.invalid) {  
    this.submitted =true;
    console.log("Form error");
    return;
  }else{  

    let d = this.Requirement_Form.value; 
    console.log(d);
    this.ProjectService.createRequirement(this.Requirement_Form.value).subscribe(data =>{
         console.log(data);
         this.Router.navigate(['L2Dashboard/Projectmanagement']); 


    }, error => {
      console.log(error); 
    });
  }

}
findProject(){
  this.ProjectService.searchProjectById(this.Project_id).subscribe(data =>{
    console.log(data);
    this.Requirement_Form.controls.Project_name.setValue(data['Project_name']);

}, error => {
  console.log(error); 
});
}
getDomains(){
  this.ProjectService.getDomains().subscribe(data =>{
    for (let item of data) {
      this.domainsList.push({
        Domain: item.Domain
      });
    }
    const removeDupliactes = (values) => {
      let concatArray = values.map(eachValue => {
        return Object.values(eachValue).join('')
      })
      let filterValues = values.filter((value, index) => {
        return concatArray.indexOf(concatArray[index]) === index
      })
      return filterValues
    }
    this.domainsList =removeDupliactes(this.domainsList); 
    console.log( this.domainsList);

}, error => {
  console.log(error); 
});
}
 




getTechnology(){
  this.ProjectService.getTechnology().subscribe(data =>{
     console.log("Technologies");
      console.log(data); 
     this.technologiesList=data;
 
}, error => {
  console.log(error); 
});
} 

 


getEducation(){
  this.ProjectService.getEducation().subscribe(data =>{
   
    for (let item of data) {
      this.educationsList.push({
        Qualification: item.Qualification
      });
    }
    console.log(this.educationsList);
}, error => {
  console.log(error); 
});

}
getRoles(){
  this.ProjectService.getRoles().subscribe(data =>{
   
    for (let item of data) {
      this.rolesList.push({
        Roles: item.Role_name
      });
    }
    console.log(this.rolesList);
}, error => {
  console.log(error); 
});

}
get f() { return this.Requirement_Form.controls; }

}