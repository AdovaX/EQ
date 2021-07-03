import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Company } from '../class/Company';
import { Contractor } from '../class/Contractor';

 @Injectable({
  providedIn: 'root'
})
export class ContractorService {

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
 getProfileData(Contractor_id): Observable<Contractor[]>{
     var data = {
         "Contractor_id" : Contractor_id
     }
    return this.http.post<Contractor[]>(this.REST_API_SERVER + '/contractor/getMyCompany/', data);
  } 
 updateContractorProfile(Contractor_id , profileData): Observable<Contractor[]>{
    
    var profileData:any = {
        'Contractor_email' : profileData.Contractor_email_Crl,
        'Contractor_phone' :profileData.Contract_phone_Crl,
        'Contractor_firstName' :profileData.Contractor_firstName_Crl,
        'Contractor_secondName' :profileData.Contractor_secondName_Crl,
        'Contractor_id' : Contractor_id
    }
   return this.http.put<Contractor[]>(this.REST_API_SERVER + '/contractor/updateProfile/', profileData);
 } 

}
