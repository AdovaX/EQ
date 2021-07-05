import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Delegate } from '../class/Delegate';
import { Company } from '../class/Company';

@Injectable({
  providedIn: 'root'
})
export class DelegateService {
  
  Delegate_id = sessionStorage.getItem('DELEGATE_ID');  
 
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
 getProfileData(Delegate_id): Observable<Delegate[]>{
  var data = {
      "Delegate_id" : Delegate_id
  }
 return this.http.post<Delegate[]>(this.REST_API_SERVER + '/delegate/getMyCompany', data);
} 

updateDelegate(Delegate_id , profileData): Observable<Delegate[]>{
  var profile:any = {
      'Delegate_name' : profileData.Delegate_fullname,
      'Delegate_email' :profileData.Delegate_email,
      'Delegate_designation' :profileData.Delegate_designation,
      'Delegate_phone' :profileData.Delegate_phone,
      'Delegate_id' : Delegate_id
  }
 return this.http.put<Delegate[]>(this.REST_API_SERVER + '/delegate/updateProfile/', profile);
} 
}
