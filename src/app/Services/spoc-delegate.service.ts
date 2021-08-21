import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Resource } from '../class/Resource';
@Injectable({
  providedIn: 'root'
})
export class SpocDelegateService {

  private REST_API_SERVER = "http://localhost:8090"; 
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
 spocDelegateLogin(credentials): Observable<any[]>{
  return this.http.post<any[]>(this.REST_API_SERVER + '/spoc/userCheck/', credentials);
}  




getResources(): Observable<Resource[]>{
  var data = {
     "Company_id" : this.Company_id
 }
return this.http.post<Resource[]>(this.REST_API_SERVER + '/listing/resourceListing', data);
} 

deleteResource(Resource_id){
  var ResourceData ={
    'Company_id':this.Company_id,
    'Resource_id' : Resource_id
  } 
  return this.http.put<any>(this.REST_API_SERVER + '/listing/ResourceDeletion/', ResourceData);
}
createResource(data): Observable<Resource[]>{
   var Resourcedata = {
    "Resource_name" : data.Resource_name,
    "Resource_Experience" : data.Resource_experience,
    "Resource_Email" : data.Resource_email,
    "Resource_password" : data.Resource_password,
    "Resource_Designation" : data.Resource_designation,
    "Resource_summery" : data.Resource_summery,
    "Resource_masked" : data.Resource_masked,
    "Resource_stack" :data.Resource_stack,
    "Is_remote" : data.isRemote,
    "Resource_status" : data.Resource_status,
    "Resource_rate" :data.Resource_rate,
    "Availability_status" : data.Resource_availability,
    "Company_id":this.Company_id
 }
return this.http.post<Resource[]>(this.REST_API_SERVER + '/listing/createResource', Resourcedata);
} 
}
