import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Project} from '../class/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService  {

  private REST_API_SERVER = "http://localhost:8080";
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



}
