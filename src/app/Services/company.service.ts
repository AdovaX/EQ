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

}
