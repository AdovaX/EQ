import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

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
  constructor(private router:Router ) { 
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

  }
  logout(){
    this.router.navigate(['Login']); 
  }
  gotoChat(){
    this.router.navigate(['company/Chats']); 
    
  }
}
