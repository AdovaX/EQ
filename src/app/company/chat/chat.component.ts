import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../Services/shared.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ChatServiceService} from '../../Services/chat-service.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  LManager_id = Number(sessionStorage.getItem('LManager_id'));
  Resource_id = Number(sessionStorage.getItem('Resource_id'));
  User_id = Number(sessionStorage.getItem('USER_ID'));
  Requirement_id = Number(sessionStorage.getItem('Requirement_id'));

  LManager_name = "";
  LManager_company = "";
  LManager_photo = "";


  Msg_Form:FormGroup;
  submitted = false;
  msgs=[];

  constructor(private formBuilder: FormBuilder,private SharedService:SharedService,private ChatServiceService:ChatServiceService) { }

  Message_send = new FormControl('',);


  ngOnInit(): void {
  //this.ChatServiceService.sendMessage('hey');
    this.getMessages();
    this.getLManager_details();
    this.getMsg();
    this.Msg_Form = this.formBuilder.group({
      Message_send : this.Message_send,  
    });
  }
  getMessages(){
    console.log('server msg req')
    this.ChatServiceService.getMessages().subscribe(data =>{
      console.log(data);  
    });
  }

  getLManager_details(){

    this.SharedService.getProfileData(this.LManager_id).subscribe(data =>{
      console.log(data);
      this.LManager_name = data['User_firstname'];
      this.LManager_company = data['CompanyTb'].C_full_name;
      this.LManager_photo = data['Profile_photo'];
         
    });  
  }
  getResource_details(){

  }
  getRequirement_details(){

  }

  get f() { return this.Msg_Form.controls; }
  getMsg(){
    this.SharedService.getMsg(this.User_id ,this.LManager_id,this.Resource_id, this.Requirement_id).subscribe(data =>{
      console.log(data); 
      this.msgs = data; 
    });
  }
  sendMsg(){
    console.log('Clicked');
    this.submitted = true; 
    if(this.Msg_Form.invalid || this.Msg_Form.value.Message_send== ''){
      return;
    }else{
      this.ChatServiceService.sendMessage(this.Msg_Form.value.Message_send,this.LManager_id);  
      console.log("done");
      this.submitted = false;
      this.SharedService.sendMsg(this.User_id ,this.LManager_id,this.Resource_id, this.Requirement_id,this.Msg_Form.value.Message_send).subscribe(data =>{
      
        this.Msg_Form.controls.Message_send.setValue('');
        this.getMsg(); 
      }); 
    } 
  }
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.sendMsg();
    }
  }
  timestampToISO(input){
    
      input = new Date(input).toISOString();
      return input;
  }
}
