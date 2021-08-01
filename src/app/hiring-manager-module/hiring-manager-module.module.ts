import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
 import { MatTableModule } from '@angular/material/table'  
 import {SharedModuleModule} from '../shared-module/shared-module.module';

 
import { HiringManagerDashboardComponent } from './hiring-manager-dashboard/hiring-manager-dashboard.component';

import { SearchResourceComponent } from './search-resource/search-resource.component';

import { HManagerProfileComponent } from './h-manager-profile/h-manager-profile.component';


import { HiringManagerModuleRoutingModule } from './hiring-manager-module-routing.module';

 
@NgModule({
  declarations: [ HiringManagerDashboardComponent, SearchResourceComponent, HManagerProfileComponent],
  imports: [
    CommonModule,
    HiringManagerModuleRoutingModule,
     ReactiveFormsModule,
    FormsModule,
    MatInputModule,SharedModuleModule,
    MatRadioModule,
    MatSelectModule,MatTableModule
  ]
})
export class HiringManagerModuleModule { }
