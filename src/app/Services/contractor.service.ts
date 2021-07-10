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
  Contractor_id = sessionStorage.getItem('CONTRACTOR_ID');  
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

 createDelegate(delegate): Observable<Delegate[]>{
     var delegateData = {
      "Delegate_name" : delegate.Delegate_fullname,
      "Delegate_email" : delegate.Delegate_email,
      "Delegate_designation" : delegate.Delegate_designation,
      "Delegate_phone" : delegate.Delegate_phone,
      "Delegate_password" : delegate.Delegate_password,
      "Company_id" : this.Company_id,
      "Delegate_status" : delegate.Delegate_status, 
     }
    return this.http.post<Delegate[]>(this.REST_API_SERVER + '/contractor/delegateCreation/', delegateData);
  } 

  getDelegatesList(){
    var data ={
      Company_id:this.Company_id
    }
    return this.http.post<Delegate[]>(this.REST_API_SERVER + '/contractor/delegateList/', data);
  
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
 return this.http.post<Spoc[]>(this.REST_API_SERVER + '/contractor/spocCreation/', data);
} 

getSpocList(){
 var data ={
   'Company_id':this.Company_id
 }
 return this.http.post<Spoc[]>(this.REST_API_SERVER + '/contractor/spocList/', data);
}
deleteSpoc(Spoc_id){
  var spocData ={
    'Company_id':this.Company_id,
    'Spoc_id' : Spoc_id
  } 
  return this.http.put<any>(this.REST_API_SERVER + '/contractor/spocDeletion/', spocData);
}
deleteDelegate(Delegate_id){
  var delegateData ={
    'Company_id':this.Company_id,
    'Delegate_id' : Delegate_id
  } 
  return this.http.put<any>(this.REST_API_SERVER + '/contractor/delegateDeletion/', delegateData);
}
updateCompany(Contractor_id,Company_id,Companydata): Observable<Company[]>{
    
  var Company:any = {
      'C_full_name' : Companydata.Company_fullname,
      'C_short_name' :Companydata.Company_shortname,
      'Website' :Companydata.Company_website,
      'No_employees' :Companydata.Company_noemployees,
      'Founded' :Companydata.Company_found,
      'About' :Companydata.Company_about,
      'Company_email' :Companydata.Company_email,
      'Company_id' : Company_id,
      'Contractor_id' : Contractor_id
  } 
 return this.http.put<Company[]>(this.REST_API_SERVER + '/contractor/updateCompany/', Company);
} 

}
