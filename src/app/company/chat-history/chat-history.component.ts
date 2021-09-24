import { Component, ElementRef, OnInit, ViewChild ,AfterViewChecked} from '@angular/core';
import {SharedService} from '../../Services/shared.service';
import {ChatServiceService} from '../../Services/chat-service.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit, AfterViewChecked {

  msgs = [];
  history =[];
  clickHistory =true;
  inputMgs="";
  User_id = sessionStorage.getItem('USER_ID');
  Requirement_id=0;
  Resource_id=0;
  Sender_id=0;
  newMsg = false;
  nomsgs =false;
  @ViewChild('msg') inputName;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private SharedService:SharedService,private ChatServiceService:ChatServiceService) { }

  ngOnInit(): void {
    this.getChatHistory();
    this.getMessages();
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
}

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  getMessages(){
    console.log('server msg req')
    this.ChatServiceService.getMessages().subscribe(data =>{
      console.log(data);  
      if(data['id'] ==this.User_id){ 
        this.newMsg = true;
        this.getChatHistory(); 
      }
    });
  }
  msgSeen(Requirement_id,Resource_id,Sender_id){
    this.SharedService.msgSeen(Requirement_id,Resource_id,Sender_id).subscribe(data =>{ 
    });
  }

  getChatHistory(){
    this.SharedService.getChatHistory().subscribe(data =>{
      console.log(data);  
      if(data.hasOwnProperty('Count')){
        this.nomsgs = true;
      }else{
        this.nomsgs = false;
        this.msgs = data;
      }
    });
  }
  getSingleChat(Sender_id){
    this.clickHistory =false;
    this.newMsg = false;
    this.SharedService.getSingleChat(Sender_id).subscribe(data =>{
      console.log(data);  
      this.history= data; 
      this.scrollToBottom();
      this.msgSeen(this.Requirement_id,this.Resource_id,Sender_id);
      
      this.Requirement_id = data[0].Requirement_id;
      this.Resource_id = data[0].Resource_id;
      this.Sender_id = data[0].Sender_id; 
      console.log('set chat values')

    });
  }
  inputmsgs(e){ 
   this.inputMgs = e.target.value;
  }
  sendMessage(){  
    this.inputName.nativeElement.value = '';

    if(this.User_id == undefined || this.Sender_id == undefined || this.Resource_id == undefined || this.Requirement_id == undefined || this.inputMgs ==''){
      console.log('Userid' + this.User_id);
      console.log('Sender_id' + this.Sender_id);
      console.log('Resource_id' + this.Resource_id);
      console.log('Requirement_id' + this.Requirement_id);
      console.log('inputMgs' + this.inputMgs);
     return;
    }else{
      console.log('Userid' + this.User_id);
      console.log('Sender_id' + this.Sender_id);
      console.log('Resource_id' + this.Resource_id);
      console.log('Requirement_id' + this.Requirement_id);
      console.log('inputMgs' + this.inputMgs);

      this.ChatServiceService.sendMessage(this.inputMgs,this.Sender_id);   
      this.SharedService.sendMsg(this.User_id ,this.Sender_id,this.Resource_id, this.Requirement_id,this.inputMgs).subscribe(data =>{ 
        this.getSingleChat(this.Sender_id); 
      }); 

    } 

  } 
}
