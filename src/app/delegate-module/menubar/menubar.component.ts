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

     } 
    ngOnInit(): void {
    }
  
  }
  