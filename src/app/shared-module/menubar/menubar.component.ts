import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {ChatServiceService} from '../../Services/chat-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SharedService} from '../../Services/shared.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
User_id="";
Role_id=0;
Company_id=0; 
Title = "";
totalMsgs=0;
userPhoto = 'https://image.flaticon.com/icons/svg/145/145867.svg';
  constructor(private router:Router,private ChatServiceService:ChatServiceService,private snackBar: MatSnackBar , private SharedService :SharedService ) { 
    this.User_id = sessionStorage.getItem('USER_ID');
    this.Role_id = Number(sessionStorage.getItem('ROLE_ID'));
    this.Company_id = Number(sessionStorage.getItem('COMPANY_ID'));  
    console.log("R :" + this.Role_id);
    console.log("C :" + this.Company_id);
    console.log("U :" + this.User_id); 
     if(this.User_id == null && sessionStorage.getItem('RESOURCE_ID') ==null){ 
      this.router.navigate(['Login']); 
    } 
   } 
  ngOnInit(): void {
    if(this.Role_id == 2){
      this.Title = "CONTRACT OWNER"; 
    }else if(this.Role_id == 3){
      this.Title = "DELIGATE";  
    }else if(this.Role_id == 4){
      this.Title = "SPOC";  
    }else if(this.Role_id == 5){
      this.Title = "LISTING MANAGER";  
    }else if(this.Role_id == 6){
      this.Title = "HIRING MANAGER";  
    }else if(this.Role_id == 7){
      this.Title = "RESOURCE";  
    }else{ 
      this.router.navigate(['Login']); 
    }  
    
    this.ChatServiceService.startRoom(this.User_id); 
    this.getMessages();
    this.getTotalMessages();

  }
  logout(){
    this.ChatServiceService.leaveRoom(this.User_id); 
    this.router.navigate(['Login']); 
  }
  gotoChat(){
    this.router.navigate(['company/Chats']);  
  }
  getMessages(){
    console.log('server msg req')
    this.ChatServiceService.getMessages().subscribe(data =>{
      console.log(data);  
      if(data['id'] ==this.User_id){
        this.openSnackBar('New Message Recived'); 
        this.getTotalMessages();

      }
    });
  }
  openSnackBar(message: string, action: string='') {
    this.snackBar.open(message, action, {
      duration: 1500,
    });
}
getTotalMessages(){
  this.SharedService.getTotalMessages(this.User_id).subscribe(data =>{ 
    this.totalMsgs = data['Count'];
  });
}
}
