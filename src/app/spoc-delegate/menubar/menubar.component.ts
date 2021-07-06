import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  Spoc_id="";
  Delegate_id="";
  isSpoc:boolean;
  isDelegate:boolean;
    constructor(private router:Router ) { 
      this.Spoc_id = sessionStorage.getItem('SPOC_ID');
      this.Delegate_id = sessionStorage.getItem('DELEGATE_ID');
       if(this.Spoc_id == null && this.Delegate_id == null ){  
        this.router.navigate(['manager/Login']); 
      } 
      if(this.Spoc_id){
        this.isSpoc = true; 
      }else if(this.Delegate_id){
        this.isDelegate = true;
      }else{ 
        this.router.navigate(['manager/Login']);  
      }
      if(this.Spoc_id == 'undefined' && this.Delegate_id == 'undefined'){
        this.router.navigate(['manager/Login']);  
      }

     } 
    ngOnInit(): void {
    }
  
  }
  