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
export class SharedService {
  User_id = sessionStorage.getItem('USER_ID');  
  Company_id = sessionStorage.getItem('COMPANY_ID');   

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
  updateUserProfile(User_id , profileData): Observable<any[]>{
    
    var profileData:any = {
        'User_email' : profileData.User_email_Crl,
        'User_phone' :profileData.User_phone_Crl,
        'User_phone2' :profileData.User_phone_Crl2,
        'User_firstname' :profileData.User_firstName_Crl,
        'User_secondname' :profileData.User_secondName_Crl,
        'User_id' :  User_id, 
        "Company_id" : this.Company_id,
        "User_designation" : profileData.User_designation_Crl
    }
    console.log("AM");
    console.log(profileData);
   return this.http.post<any[]>(this.REST_API_SERVER + '/users/updateProfile/', profileData);
 } 
 getProfileData(User_id): Observable<Contractor[]>{
  var data = {
      "User_id" : User_id
  }
 return this.http.post<Contractor[]>(this.REST_API_SERVER + '/users/getProfileData/', data);
} 
profilePhotoUpdate(profile_photo): Observable<any>{
  const formData: FormData = new FormData();

  formData.append('file', profile_photo);
  formData.append('User_id', this.User_id);
 
return this.http.post<any>(this.REST_API_SERVER + '/users/profilePhotoUpdate/', formData);
} 

}
