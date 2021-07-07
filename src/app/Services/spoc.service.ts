import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Delegate } from '../class/Delegate';
import { Company } from '../class/Company';
import { Spoc } from '../class/Spoc';
import { ListingManager } from '../class/ListingManager';

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
 

createLManager(LManager): Observable<ListingManager[]>{
  var data = {
   "LManager_name" : LManager.LM_fullname,
   "LManager_email" : LManager.LM_email,
   "LManager_designation" : LManager.LM_designation,
   "LManager_phone" : LManager.LM_phone,
   "LManager_password" : LManager.LM_password,
   "Company_id" : this.Company_id,
   "LManager_status" : LManager.LM_status,
  }
 return this.http.post<ListingManager[]>(this.REST_API_SERVER + '/spoc/createListingManager/', data);
} 

getListingManagers(): Observable<ListingManager[]>{
  var data = {
     "Company_id" : this.Company_id
 }
return this.http.post<ListingManager[]>(this.REST_API_SERVER + '/spoc/getListingManagers', data);
} 

deleteLM(LM_id){
  var LMData ={
    'Company_id':this.Company_id,
    'LManager_id' : LM_id
  } 
  return this.http.put<any>(this.REST_API_SERVER + '/spoc/LMDeletion/', LMData);
}





}
