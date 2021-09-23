import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { io } from "socket.io-client"; 
import * as Rx from 'rxjs/Rx'; 
import { Observer } from 'rxjs/Observer'; 

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  
  private url = 'ws://localhost:5000';
   socket; 
   User_id = sessionStorage.getItem('USER_ID');  
   Company_id = sessionStorage.getItem('COMPANY_ID');    

  constructor(private http: HttpClient) { 
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] });  
    
   
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

public sendMessage(incoming , Sender_id) { 
  this.startRoom(Sender_id);
    var message = {
      'Message' : incoming,
      'id' : Sender_id 
    } 
    this.socket.emit('new-message', message)
}

getMessages(): Observable<string> {
 console.log('waiting') 
   

    return   new Observable((observer) => 
      this.socket.on('message', (data) => observer.next(data))
    );  
}
startRoom(User_id){
  console.log('Room is : ' + User_id);
  //this.socket.emit('Leave_room', this.User_id); 
  this.socket.emit('room', User_id); 
} 
}