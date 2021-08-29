import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {ListingManager} from '../class/ListingManager';
import { Company } from '../class/Company';
import {Resource} from '../class/Resource';
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class ListingManagerService  {

  HOST = window.location.hostname; 
  REST_API_SERVER = "http://3.109.113.141:8090";
  
  Company_id = sessionStorage.getItem('COMPANY_ID');  
  User_id = sessionStorage.getItem('USER_ID');  

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
 
  
getResources(): Observable<any[]>{
  var data = {
     "Company_id" : this.Company_id
 }
return this.http.post<any[]>(this.REST_API_SERVER + '/listing/resourceListing', data);
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
createResource(data , technology_list,domain_list,jobRole_list,education_list, cv , videoFile): Observable<Resource[]>{
  const formData: FormData = new FormData();

  formData.append('file', cv);
  formData.append('video', videoFile);
  formData.append('Resource_name',data.Resource_name);
  formData.append('Resource_salutation',data.Resource_salutation);
  formData.append('Resource_currency',data.Resource_currency);
  formData.append('Resource_Experience',data.Resource_experience);
  formData.append('Resource_Email',data.Resource_email);
  formData.append('Resource_Phone',data.Resource_phone);
  formData.append('Resource_password',data.Resource_password);
  formData.append('Resource_Designation',data.Resource_designation);
  formData.append('Resource_summery',data.Resource_summery);
  formData.append('Resource_stack',data.Resource_stack);
  formData.append('Is_remote',data.isRemote);
  formData.append('Resource_status',data.Resource_status);
  formData.append('Resource_rate',data.Resource_rate);
  formData.append('Availability_status',data.Resource_availability);
  formData.append('Available_from',data.Available_from);
  formData.append('Available_to',data.Available_to);
  formData.append('Company_id',this.Company_id);
  formData.append('Technology_List',JSON.stringify(technology_list));
  formData.append('Domain_List',JSON.stringify(domain_list));
  formData.append('Role_List',JSON.stringify(jobRole_list));
  formData.append('Education_List',JSON.stringify(education_list));
  formData.append('Created_by',this.User_id);
  formData.append('Resource_location',data.Resource_location);
 
return this.http.post<Resource[]>(this.REST_API_SERVER + '/listing/createResource', formData);
} 


introVideo(fileToUpload, Resource_id): Observable<any> {
   
  const formData: FormData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('Resource_id',Resource_id);
  return  this.http.post<any>(this.REST_API_SERVER +'/listing/introVideo', formData);
}
getDomainLists(){
  var data = {
  Company_id : this.Company_id
}
return this.http.post<any[]>(this.REST_API_SERVER + '/listing/getDomainLists/', data);

}
getJobRoleLists(){
  var data = {
  Company_id : this.Company_id
}
return this.http.post<any[]>(this.REST_API_SERVER + '/listing/getJobRoleLists/', data);

}
getTechnologyByParent(Technology_category_id){
  var data = {
  Company_id : this.Company_id,
  Technology_category_id:Technology_category_id
}
return this.http.post<any[]>(this.REST_API_SERVER + '/listing/getTechnologyByParent/', data);

}
getTechnologyLists(){
  var data = {
  Company_id : this.Company_id, 
}
return this.http.post<any[]>(this.REST_API_SERVER + '/listing/getTechnologyLists/', data);

}
getEducationLists(){
  var data = {
  Company_id : this.Company_id, 
}
return this.http.post<any[]>(this.REST_API_SERVER + '/listing/getEducationLists/', data);

}
getEduStreams(val){
  var data = {
  Company_id : this.Company_id, 
  Stream_category:val

}
return this.http.post<any[]>(this.REST_API_SERVER + '/listing/getEduStreams/', data);

}
getEduMtech(){
  var data = {
  Company_id : this.Company_id, 
}
return this.http.post<any[]>(this.REST_API_SERVER + '/listing/getEduMtech/', data);

}

toogleActive(r_id , val){
  var data = {
    Company_id : this.Company_id, 
    Resource_id :r_id,
    Resource_active:val
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/listing/toogleActive/', data);
}
updateFrom(val ,r_id ){
  var data = {
    Company_id : this.Company_id, 
    Resource_id :r_id,
    Available_from:val
  }
  console.log(data);
  return this.http.post<any[]>(this.REST_API_SERVER + '/listing/updateFrom/', data);
}
updateTo(val ,r_id ){
  var data = {
    Company_id : this.Company_id, 
    Resource_id :r_id,
    Available_to:val
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/listing/updateTo/', data);
}
getResourceData(r_id ){
  var data = {
    Company_id : this.Company_id, 
    Resource_id :r_id, 
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/listing/getResourceData/', data);
}

editResource(data , technology_list,domain_list,jobRole_list,education_list, cv , videoFile): Observable<Resource[]>{
  const formData: FormData = new FormData();

  formData.append('file', cv);
  formData.append('video', videoFile);
  formData.append('Resource_id',data.Resource_id);
  formData.append('Resource_name',data.Resource_name);
  formData.append('Resource_Experience',data.Resource_experience);
  formData.append('Resource_Email',data.Resource_email);
  formData.append('Resource_Phone',data.Resource_phone);
  formData.append('Resource_password',data.Resource_password);
  formData.append('Resource_Designation',data.Resource_designation);
  formData.append('Resource_summery',data.Resource_summery);
  formData.append('Resource_stack',data.Resource_stack);
  formData.append('Is_remote',data.isRemote);
  formData.append('Resource_status',data.Resource_status);
  formData.append('Resource_rate',data.Resource_rate);
  formData.append('Availability_status',data.Resource_availability);
  formData.append('Available_from',data.Available_from);
  formData.append('Available_to',data.Available_to);
  formData.append('Company_id',this.Company_id);
  formData.append('Technology_List',JSON.stringify(technology_list));
  formData.append('Domain_List',JSON.stringify(domain_list));
  formData.append('Role_List',JSON.stringify(jobRole_list));
  formData.append('Education_List',JSON.stringify(education_list));
 
return this.http.post<Resource[]>(this.REST_API_SERVER + '/listing/editResource', formData);
} 
profilePhotoChange(profile_photo,Resource_id):Observable<any>{
  const formData: FormData = new FormData();

  formData.append('file', profile_photo);
  formData.append('Resource_id',Resource_id);
  console.log(formData);

  return this.http.post<any[]>(this.REST_API_SERVER + '/listing/profilePhotoChange', formData);

}

profileCompletion(r_id ){
  var data = {
    Company_id : this.Company_id, 
    Resource_id :r_id, 
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/listing/profileCompletion/', data);
}
resourceRequests(){
  var data = {
    Company_id : this.Company_id, 
    Created_by : this.User_id  
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/listing/resourceRequests/', data);
}
approveResources(Resource_id,Requirement_id){
  var data = {
    Approved_by : Number(this.User_id), 
    Requirement_id :Requirement_id,
    Company_id : Number(this.Company_id),
    Resource_id:Resource_id  
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/listing/approveResources/', data);

}
listofApprovedResources(){
  var data = {
    Approved_by : Number(this.User_id)  
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/listing/listofApprovedResources/', data);

}


}
