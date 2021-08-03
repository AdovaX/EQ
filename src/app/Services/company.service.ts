import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Company } from '../class/Company';
import { Contractor } from '../class/Contractor';
import { User } from '../class/User';

 @Injectable({
  providedIn: 'root'
})
export class CompanyService {

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
  
 getCompanyList(): Observable<any> {
  return this.http.get<any>(this.REST_API_SERVER + '/company/companylist')
  .pipe(retry(1),
    catchError(this.handleError)
  )
}
getRoles(): Observable<any> {
 return this.http.get<any>(this.REST_API_SERVER + '/company/roles')
 .pipe(retry(1),
   catchError(this.handleError)
 )
}
insertCompany(company , contractor): Observable<any>{
  var data = {
    'C_full_name' : company.C_full_name,
    'C_short_name': company.C_short_name,
    'No_employees': company.No_employees,
    'Website': company.Website,
    'User_email': contractor.User_email,
    'User_password': contractor.User_password,
    'User_designation': contractor.User_designation,
    'User_phone': contractor.User_phone,

  } 
  return this.http.post<any>(this.REST_API_SERVER + '/company/signup/', data);
}  
companyLogin(company): Observable<User[]>{ 
  return this.http.post<User[]>(this.REST_API_SERVER + '/company/login/', company);
}  

getMyCompany(){
  return this.http.get<any>(this.REST_API_SERVER).pipe(catchError(this.handleError));

}
addBranches(User_id,Company_id,Branchdata): Observable<any[]>{
    
  var Branch:any = {
      'Company_city' : Branchdata.Company_city,
      'Company_city_address' :Branchdata.Company_city_address,
      'Company_gmap' :Branchdata.Company_gmap, 
      'Company_GSTIN' :Branchdata.Company_GSTIN, 
      'Company_id' :Company_id, 
      'User_id' : User_id
  } 
 return this.http.post<any[]>(this.REST_API_SERVER + '/company/addBranch/', Branch);
} 
getBranches(Company_id){
  var data = {
    Company_id : Company_id
  }
  return this.http.post<Company[]>(this.REST_API_SERVER + '/company/getBranches/', data);
}
addBankAccount(User_id,Company_id,Bankdata): Observable<any[]>{
    
  var Branch  = {
      'Bank_name' : Bankdata.Bank_name,
      'Bank_branch' :Bankdata.Bank_Branch,
      'Bank_accountNumber' :Bankdata.Bank_accountNumber, 
      'Bank_address' :Bankdata.Bank_address, 
      'Bank_IFSC' :Bankdata.Bank_IFSC, 
      'Company_id' :Company_id, 
      'User_id' : User_id
  } 
 return this.http.post<any[]>(this.REST_API_SERVER + '/company/addBank/', Branch);
} 
getBanks(Company_id){
  var data = {
    Company_id : Company_id
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/company/getBanks/', data);
}

upddatePreferences(User_id,Company_id,Preferences): Observable<any[]>{
    
  var preferences  = {
      'Enable_masking' : Preferences.Enable_masking,
      'Freelancers' :Preferences.Enable_freelancers,
      'Tiers_maching' :Preferences.Company_tiers, 
      'Company_id' :Company_id, 
      'User_id' : User_id
  }  
 return this.http.post<any[]>(this.REST_API_SERVER + '/company/updatePreferences/', preferences);
} 
getPreferences(Company_id){
  var data = {
    Company_id : Company_id
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/company/getPreferences/', data);
}

addGovernmentData(User_id,Company_id,Gov): Observable<any[]>{
    
  var gov  = {
      'Company_TAN' : Gov.Company_TAN,
      'Company_CIN' :Gov.Company_CIN,
      'Company_PAN' :Gov.Company_PAN, 
      'Company_id' :Company_id, 
      'User_id' : User_id
  }  
 return this.http.post<any[]>(this.REST_API_SERVER + '/company/addGovIds/', gov);
} 
getGovernmentData(Company_id){
  var data = {
    Company_id : Company_id
  }
  return this.http.post<any[]>(this.REST_API_SERVER + '/company/getGovernmentData/', data);
}
}
