import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
isLManager :boolean;
isHManager :boolean;
User_id =""; 
  constructor(private router:Router) { 
    this.User_id = sessionStorage.getItem('USER_ID'); 
    
    if(this.User_id == null  ){  
      this.router.navigate(['company/Login']); 
      
    }  
  }

  ngOnInit(): void { 
  }

}
