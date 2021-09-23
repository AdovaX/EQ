import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../Services/shared.service';
@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {

  msgs = [];
  history =[];
  clickHistory =true;
  User_id = sessionStorage.getItem('USER_ID');
  constructor(private SharedService:SharedService) { }

  ngOnInit(): void {
    this.getChatHistory();
  }
  getChatHistory(){
    this.SharedService.getChatHistory().subscribe(data =>{
      console.log(data);  
      this.msgs = data;
    });
  }
  getSingleChat(id){
    this.clickHistory =false;
    this.SharedService.getSingleChat(id).subscribe(data =>{
      console.log(data);  
      this.history= data; 
    });
  }
}
