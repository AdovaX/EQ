import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LhManagerService  {

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
 LHManagerLogin(credentials): Observable<any[]>{
  return this.http.post<any[]>(this.REST_API_SERVER + '/Listing/userCheck/', credentials);
}  




}
