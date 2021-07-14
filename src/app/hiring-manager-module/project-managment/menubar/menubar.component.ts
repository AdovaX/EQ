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
USER_ID =""; 
  constructor(private router:Router) { 
    this.USER_ID = sessionStorage.getItem('USER_ID'); 
    
    if(this.USER_ID == null   ){  
      this.router.navigate(['company/Login']); 
      
    } 
    
  }

  ngOnInit(): void { 
  }

}
