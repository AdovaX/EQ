import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Company } from '../class/Company';
import { Contractor } from '../class/Contractor';
import { Delegate } from '../class/Delegate';
import { Spoc } from '../class/Spoc';

 @Injectable({
  providedIn: 'root'
})
export class ContractorService {
  User_id = sessionStorage.getItem('USER_ID');  
  Company_id = sessionStorage.getItem('COMPANY_ID');  
  Contractor_id = sessionStorage.getItem('CONTRACTOR_ID');  
 
  HOST = window.location.hostname; 
  REST_API_SERVER = "http://3.109.113.141:8090";
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
 
  

 createDelegate(delegate): Observable<any[]>{
     var delegateData = {
      "Delegate_name" : delegate.Delegate_fullname,
      "Delegate_email" : delegate.Delegate_email,
      "Delegate_designation" : delegate.Delegate_designation,
      "Delegate_phone" : delegate.Delegate_phone,
      "Delegate_password" : delegate.Delegate_password,
      "Company_id" : this.Company_id,
      "Delegate_status" : delegate.Delegate_status, 
     }
    return this.http.post<any[]>(this.REST_API_SERVER + '/contractor/delegateCreation/', delegateData);
  } 

  getDelegatesList(){
    var data ={
      Company_id:this.Company_id
    }
    return this.http.post<any[]>(this.REST_API_SERVER + '/contractor/delegateList/', data);
  
  }

 createSpoc(spoc): Observable<Spoc[]>{
  var data = {
   "Spoc_name" : spoc.Spoc_fullname,
   "Spoc_email" : spoc.Spoc_email,
   "Spoc_designation" : spoc.Spoc_designation,
   "Spoc_phone" : spoc.Spoc_phone,
   "Spoc_password" : spoc.Spoc_password,
   "Company_id" : this.Company_id,
   "Spoc_status" : spoc.Spoc_status,
  }
  console.log(data);
 return this.http.post<Spoc[]>(this.REST_API_SERVER + '/contractor/spocCreation/', data);
} 

getSpocList(){
 var data ={
   'Company_id':this.Company_id
 }
 return this.http.post<any[]>(this.REST_API_SERVER + '/contractor/spocList/', data);
}
deleteSpoc(Spoc_id){
  var spocData ={
    'Company_id':this.Company_id,
    'User_id' : Spoc_id
  } 
  return this.http.put<any>(this.REST_API_SERVER + '/contractor/spocDeletion/', spocData);
}
deleteDelegate(Delegate_id){
  var delegateData ={
    'Company_id':this.Company_id,
    'User_id' : Delegate_id
  } 
  return this.http.put<any>(this.REST_API_SERVER + '/contractor/delegateDeletion/', delegateData);
}
updateCompany(User_id,Company_id,Companydata): Observable<Company[]>{
    
  var Company:any = {
      'C_full_name' : Companydata.Company_fullname,
      'C_short_name' :Companydata.Company_shortname,
      'Website' :Companydata.Company_website,
      'No_employees' :Companydata.Company_noemployees,
      'Founded' :Companydata.Company_found,
      'About' :Companydata.Company_about,
      'Company_email' :Companydata.Company_email,
      'Company_id' : Company_id,
      'User_id' : User_id
  } 
 return this.http.put<Company[]>(this.REST_API_SERVER + '/contractor/updateCompany/', Company);
} 

editDelegate(Delegate_id){
  var delegateData ={
    'Company_id':this.Company_id,
    'User_id' : Delegate_id
  } 
  return this.http.put<any>(this.REST_API_SERVER + '/contractor/delegateDeletion/', delegateData);
}
getDelegatesById(User_id){
  var data ={
   'Company_id':this.Company_id,
    'User_id':User_id
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/contractor/getDelegatesById/', data);

}
editDelegateData(Delegate , User_id){
  var data ={
    "User_firstname" : Delegate.Delegate_fullname,
    "User_email" : Delegate.Delegate_email,
    "User_designation" : Delegate.Delegate_designation,
    "User_phonenumber" : Delegate.Delegate_phone,
    "User_password" : Delegate.Delegate_password,
    "Company_id" : this.Company_id, 
    "User_id" : User_id
  }
  console.log(data);
  return this.http.post<any[]>(this.REST_API_SERVER + '/contractor/editDelegateData/', data);

}
}
