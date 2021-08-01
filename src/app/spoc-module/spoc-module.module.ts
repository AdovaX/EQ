import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';

import {SharedModuleModule} from '../shared-module/shared-module.module';
import { SpocModuleRoutingModule } from './spoc-module-routing.module';
import { SpocDashboardComponent } from './spoc-dashboard/spoc-dashboard.component';
import { SpocProfileComponent } from './spoc-profile/spoc-profile.component';
import { CreateListingManagerComponent } from './create-listing-manager/create-listing-manager.component';
import { CreateHiringManagerComponent } from './create-hiring-manager/create-hiring-manager.component';
import { ResourceListComponent } from './resource-list/resource-list.component';

import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [ SpocDashboardComponent, SpocProfileComponent, CreateListingManagerComponent, 
    CreateHiringManagerComponent, ResourceListComponent],
  imports: [
    CommonModule,
    SpocModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,MatRadioModule,MatSelectModule,SharedModuleModule
  ]
})
export class SpocModuleModule { }
