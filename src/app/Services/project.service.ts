import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Project} from '../class/Project';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService  {

  HOST = window.location.hostname; 
  REST_API_SERVER = "http://3.109.113.141:8090";
  User_id = sessionStorage.getItem('USER_ID');  
  Company_id = sessionStorage.getItem('COMPANY_ID'); 
  constructor(private http: HttpClient) {
    if(this.HOST === 'localhost'){
       this.REST_API_SERVER = "http://localhost:8090";
    }
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
    } else {
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
 createProject(data): Observable<Project[]>{ 

    data.User_id = this.User_id
    data.Company_id = this.Company_id
  
return this.http.post<Project[]>(this.REST_API_SERVER + '/hiring/createproject', data);
  
}
getProjects(): Observable<Project[]>{ 
var data = {
    "Company_id" : this.Company_id
} 
return this.http.post<Project[]>(this.REST_API_SERVER + '/hiring/projectList', data);
}
searchProjectById(Project_id){
  var data = {
    "Project_id" : Project_id
} 
return this.http.post<Project[]>(this.REST_API_SERVER + '/hiring/searchProjectById', data);
}
getDomains(){
  
  return this.http.get<any>(this.REST_API_SERVER + '/project/getDomains')
  .pipe(retry(1),
    catchError(this.handleError)
  )

}
getTechnology(){
  return this.http.get<any>(this.REST_API_SERVER + '/project/getTechnology')
  .pipe(retry(1),
    catchError(this.handleError)
  )
}
getEducation(){
  return this.http.get<any>(this.REST_API_SERVER + '/project/getEducation')
  .pipe(retry(1),
    catchError(this.handleError)
  )
}
getRoles(){
  return this.http.get<any>(this.REST_API_SERVER + '/project/getRoles')
  .pipe(retry(1),
    catchError(this.handleError)
  )
}
createRequirement(data,technology_list,domain_list,jobRole_list,education_list,Project_id): Observable<any>{ 
  data.Technology_id=technology_list;
  data.Domain_id = domain_list;
  data.Roles_id = jobRole_list;
  data.Certification=education_list;
  data.User_id = Number(this.User_id);
  data.Company_id = Number(this.Company_id); 
  data.ProjectId=Project_id;
  console.log(data);
return this.http.post<any>(this.REST_API_SERVER + '/project/createassignment', data);

}
getAssignmentsById(Project_id):Observable<any>{
  var data = {
    "Project_id" : Project_id,
    "User_id" : this.User_id
} 
return this.http.post<any>(this.REST_API_SERVER + '/project/getAssignmentsById', data);
}
getProjectById(Project_id){
  var data = {
    "Project_id" : Project_id,
    "User_id" : this.User_id
} 
return this.http.post<Project[]>(this.REST_API_SERVER + '/project/getProjectById', data);
}
machingResources(Requirement_id):Observable<any>{
  var data = {
    "Requirement_id" : Requirement_id
} 
return this.http.post<any[]>(this.REST_API_SERVER + '/project/ProjectMatching', data);
}
toogleActive(Project_id,currentValue){
  var data = {
    "Project_id" : Project_id,
    "Status" : currentValue
} 
return this.http.post<any[]>(this.REST_API_SERVER + '/project/updateProjectStatus', data);
}
updateStart(fromDate,Project_id){
  var data = {
    Company_id : this.Company_id, 
    Project_id :Project_id,
    Start_date:fromDate
  }
  console.log(data);
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/updateStart/', data);
}
updateEnd(toDate,Project_id){
  var data = {
    Company_id : this.Company_id, 
    Project_id :Project_id,
    End_date:toDate
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/updateEnd/', data);
}

getRequirementData(Resource_id){
  return this.http.get<any>(this.REST_API_SERVER + '/project/getRequirementData')
  .pipe(retry(1),
    catchError(this.handleError)
  )
}

addBookmark(Requirement_id,Resource_id){
  var data = {
    Company_id : this.Company_id, 
    Requirement_id : Requirement_id, 
    Resource_id :Resource_id,
    User_id:this.User_id
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/addBookmark/', data);
}
getBookmark(){
  var data = {
    Company_id : this.Company_id, 
    User_id:Number(this.User_id)
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/getBookmark/', data);

}
removeBookmark(Resource_id){
  var data = {
    Company_id : this.Company_id,  
    Resource_id :Resource_id,
    User_id:this.User_id
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/removeBookmark/', data);
}
setInterview(Requirement_id,Resource_id,Interview_date){
  var data = {
    Company_id : this.Company_id,  
    Resource_id :Resource_id,
    Requirement_id :Requirement_id,
    Interview_date :Interview_date,
    User_id:this.User_id
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/setInterview/', data);
}
mailInterview(Requirement_id,Resource_id,interviewForm){
  var ts = interviewForm.interviewTime;
  var H = +ts.substr(0, 2);
  var h = (H % 12) || 12;
  h = Number((h < 10)?("0"+h):h);   
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm; 
 
  var data = {
    Company_id : this.Company_id,  
    Resource_id :Resource_id,
    Requirement_id :Requirement_id,
    bodymail :interviewForm.bodymail,
    interviewDate :moment(interviewForm.interviewDate).format('YYYY-MM-DD'),
    interviewTime :ts,
    User_id:this.User_id
  } 
  console.log(data);
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/mailInterview/', data);
}
getInterviewResources(){
  var data = {
    Company_id : this.Company_id,  
    User_id :this.User_id
  } 
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/getInterviewResources/', data);
}
getapprovedResources(){
  var data = {
    Company_id : this.Company_id,  
    User_id :this.User_id
  } 
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/getapprovedResources/', data);
}
changeInterviewStatus(Interview_status,Resource_id,Requirement_id){
  var data = {
    Resource_id : Resource_id,  
    Requirement_id :Requirement_id,
    Company_id :this.Company_id,
    Interview_status : Interview_status,  
    User_id :this.User_id
  } 
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/changeInterviewStatus/', data);
}
shortListResource(Resource_id,Requirement_id){
  var data = {
    Resource_id : Resource_id,  
    Requirement_id :Requirement_id,
    Company_id :this.Company_id, 
    User_id :this.User_id
  } 
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/shortListResource/', data);
}
getShortListResource(){
  var data = {
    Company_id : this.Company_id, 
    User_id:Number(this.User_id)
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/project/getShortListResource/', data);

}
}
