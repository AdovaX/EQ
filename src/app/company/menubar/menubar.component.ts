import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
Contractor_id="";
  constructor(private router:Router ) { 
    this.Contractor_id = sessionStorage.getItem('CONTRACTOR_ID');
     if(this.Contractor_id == null){ 
      this.router.navigate(['company/Login']); 
    }
   } 
  ngOnInit(): void {
  }

}
