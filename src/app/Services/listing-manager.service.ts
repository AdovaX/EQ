import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {ListingManager} from '../class/ListingManager';
import { Company } from '../class/Company';
import {Resource} from '../class/Resource';
@Injectable({
  providedIn: 'root'
})
export class ListingManagerService  {

  private REST_API_SERVER = "http://localhost:8080";

  LManager_id = sessionStorage.getItem('LM_ID');  
  Company_id = sessionStorage.getItem('COMPANY_ID');  
  User_id = sessionStorage.getItem('USER_ID');  

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

updateLManagerProfile( profileData): Observable<ListingManager[]>{
  var profile:any = {
      'LManager_name' : profileData.LManager_fullname,
      'User_email' :profileData.User_email,
      'LManager_designation' :profileData.LManager_designation,
      'LManager_phone' :profileData.LManager_phone,
      'User_id' : this.User_id,
      'LManager_id' : sessionStorage.getItem("LM_ID")
  }
 return this.http.put<ListingManager[]>(this.REST_API_SERVER + '/listing/updateProfile/', profile);
} 
 
getProfileData(LManager_id): Observable<ListingManager[]>{
  var data = {
     "User_id" : LManager_id
 }
return this.http.post<ListingManager[]>(this.REST_API_SERVER + '/listing/getMyCompany', data);
} 
getResources(): Observable<ListingManager[]>{
  var data = {
     "Company_id" : this.Company_id
 }
return this.http.post<ListingManager[]>(this.REST_API_SERVER + '/listing/resourceListing', data);
} 
getTechnologyParents(): Observable<any[]>{
  var data = {
     "Company_id" : this.Company_id
 }
return this.http.post<any[]>(this.REST_API_SERVER + '/listing/getTechnologyParents', data);
} 

deleteResource(Resource_id){
  var ResourceData ={
    'Company_id':this.Company_id,
    'Resource_id' : Resource_id
  } 
  return this.http.put<any>(this.REST_API_SERVER + '/listing/ResourceDeletion/', ResourceData);
}
createResource(data , technology_list,domain_list,jobRole_list): Observable<Resource[]>{
   var Resourcedata = {
    "Resource_name" : data.Resource_name,
    "Resource_Experience" : data.Resource_experience,
    "Resource_Email" : data.Resource_email,
    "Resource_Phone" : data.Resource_phone,
    "Resource_password" : data.Resource_password,
    "Resource_Designation" : data.Resource_designation,
    "Resource_summery" : data.Resource_summery, 
    "Resource_stack" :data.Resource_stack,
    "Is_remote" : data.isRemote,
    "Resource_status" : data.Resource_status,
    "Resource_rate" :data.Resource_rate,
    "Availability_status" : data.Resource_availability,
    "Company_id":this.Company_id,
    "Technology_List" : technology_list,
    "Domain_List" : domain_list,
    "Role_List" : jobRole_list

 }
return this.http.post<Resource[]>(this.REST_API_SERVER + '/listing/createResource', Resourcedata);
} 
}
