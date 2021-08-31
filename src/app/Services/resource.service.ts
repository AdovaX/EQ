import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Project} from '../class/Project';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  HOST = window.location.hostname; 
  REST_API_SERVER = "http://3.109.113.141:8090";
  Resource_id = Number(sessionStorage.getItem('RESOURCE_ID'));
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
 getRequirementData():Observable<any>{
  var data = {
      "Resource_id" : this.Resource_id
  } 
  return this.http.post<any[]>(this.REST_API_SERVER + '/resource/getRequirementData', data);

 }
}
