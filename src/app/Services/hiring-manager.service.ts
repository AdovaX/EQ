import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {HiringManager} from '../class/HiringManager';
import { Company } from '../class/Company';
import {Resource} from '../class/Resource';

@Injectable({
  providedIn: 'root'
})
export class HiringManagerService  {

  private REST_API_SERVER = "http://localhost:8080";

  HManager_id = sessionStorage.getItem('HM_ID');  
  Company_id = sessionStorage.getItem('COMPANY_ID');  

  constructor(private http: HttpClient) { }
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

updateLManagerProfile( profileData): Observable<HiringManager[]>{
  var profile:any = {
      'HManager_name' : profileData.HManager_fullname,
      'HManager_email' :profileData.HManager_email,
      'HManager_designation' :profileData.HManager_designation,
      'HManager_phone' :profileData.HManager_phone,
      'HManager_id' : this.HManager_id
  }
 return this.http.put<HiringManager[]>(this.REST_API_SERVER + '/hiring/updateProfile/', profile);
} 
 
getProfileData(HManager_id): Observable<HiringManager[]>{
  var data = {
     "HManager_id" : HManager_id
 }
return this.http.post<HiringManager[]>(this.REST_API_SERVER + '/hiring/getMyCompany', data);
}  
getResources(HManager_id): Observable<Resource[]>{
  var data = {
     "HManager_id" : HManager_id
 }
return this.http.post<Resource[]>(this.REST_API_SERVER + '/hiring/getResources_all', data);
}  
  
}
