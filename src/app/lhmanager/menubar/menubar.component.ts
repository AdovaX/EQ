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
LM_id ="";
HM_id="";
  constructor(private router:Router) { 
    this.LM_id = sessionStorage.getItem('LM_ID');
    this.HM_id= sessionStorage.getItem('HM_ID');
    
    if(this.LM_id == null && this.HM_id == null ){  
      this.router.navigate(['listing/Login']); 
      
    } 
     if(this.LM_id){
      this.isLManager = true; 
       return;
    }else if(this.HM_id){
      this.isHManager = true;
       return;
    }else{ 
      this.router.navigate(['listing/Login']);  
    }
    if(this.LM_id == 'undefined' && this.HM_id == 'undefined'){
      this.router.navigate(['listing/Login']);  
    }
  }

  ngOnInit(): void { 
  }

}
