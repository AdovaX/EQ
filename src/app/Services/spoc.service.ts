import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Delegate } from '../class/Delegate';
import { Company } from '../class/Company';
import { Spoc } from '../class/Spoc';

@Injectable({
  providedIn: 'root'
})
export class SpocService {

  Spocid = sessionStorage.getItem('SPOC_ID');  
  Company_id = sessionStorage.getItem('COMPANY_ID');  
 
  private REST_API_SERVER = "http://localhost:8080";
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
 getProfileData(Spoc_id): Observable<Spoc[]>{
   var data = {
      "Spoc_id" : Spoc_id
  }
 return this.http.post<Spoc[]>(this.REST_API_SERVER + '/spoc/getMyCompany', data);
} 

updateSpoc(Spoc_id , profileData): Observable<Spoc[]>{
  var profile:any = {
      'Spoc_name' : profileData.Spoc_name,
      'Spoc_email' :profileData.Spoc_email,
      'Spoc_designation' :profileData.Spoc_designation,
      'Spoc_phone' :profileData.Spoc_phone,
      'Spoc_id' : Spoc_id
  }
 return this.http.put<Spoc[]>(this.REST_API_SERVER + '/spoc/updateProfile/', profile);
} 
 
 




}
