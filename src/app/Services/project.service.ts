import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Project} from '../class/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService  {

  private REST_API_SERVER = "http://localhost:8090";
  User_id = sessionStorage.getItem('USER_ID');  
  Company_id = sessionStorage.getItem('COMPANY_ID'); 
  constructor(private http: HttpClient) {}
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
}
