import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Delegate } from '../class/Delegate';
import { Company } from '../class/Company';
import { Spoc } from '../class/Spoc';
import { ListingManager } from '../class/ListingManager';
import { HiringManager } from '../class/HiringManager';

@Injectable({
  providedIn: 'root'
})
export class SpocService {

  User_id = sessionStorage.getItem('USER_ID');  
  Company_id = sessionStorage.getItem('COMPANY_ID');  
 
  private REST_API_SERVER = "http://localhost:8090";
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
 getProfileData(User_id): Observable<Spoc[]>{
   var data = {
      "User_id" : User_id
  }
 return this.http.post<Spoc[]>(this.REST_API_SERVER + '/spoc/getMyCompany', data);
} 

updateSpoc(User_id , profileData): Observable<Spoc[]>{
  var profile:any = {
      'Spoc_name' : profileData.Spoc_name,
      'User_email' :profileData.User_email,
      'Spoc_designation' :profileData.Spoc_designation,
      'Spoc_phone' :profileData.Spoc_phone,
      'User_id' : User_id,
      'Spoc_id' : sessionStorage.getItem("SPOC_ID")
  }
 return this.http.put<Spoc[]>(this.REST_API_SERVER + '/spoc/updateProfile/', profile);
} 
 

createLManager(LManager): Observable<ListingManager[]>{
  var data = {
   "LManager_name" : LManager.LM_fullname,
   "User_email" : LManager.LM_email,
   "LManager_designation" : LManager.LM_designation,
   "LManager_phone" : LManager.LM_phone,
   "User_password" : LManager.LM_password,
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

createHManager(HManager): Observable<HiringManager[]>{
  var data = {
   "HManager_name" : HManager.HM_fullname,
   "User_email" : HManager.User_email,
   "HManager_designation" : HManager.HM_designation,
   "HManager_phone" : HManager.HM_phone,
   "User_password" : HManager.HM_password,
   "Company_id" : this.Company_id,
   "HManager_status" : HManager.HM_status,
  }
 return this.http.post<HiringManager[]>(this.REST_API_SERVER + '/spoc/createHiringManager/', data);
} 



getHiringManagers(): Observable<HiringManager[]>{
  var data = {
     "Company_id" : this.Company_id
 }
return this.http.post<HiringManager[]>(this.REST_API_SERVER + '/spoc/getHiringManagers', data);
} 

deleteHM(HM_id){
  var HMData ={
    'Company_id':this.Company_id,
    'HManager_id' : HM_id
  } 
  return this.http.put<any>(this.REST_API_SERVER + '/spoc/HMDeletion/', HMData);
}


}
