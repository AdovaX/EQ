import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';

import { SpocModuleRoutingModule } from './spoc-module-routing.module';
import { MenubarComponent } from './menubar/menubar.component';
import { SpocDashboardComponent } from './spoc-dashboard/spoc-dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { SpocProfileComponent } from './spoc-profile/spoc-profile.component';
import { CreateListingManagerComponent } from './create-listing-manager/create-listing-manager.component';
import { CreateHiringManagerComponent } from './create-hiring-manager/create-hiring-manager.component';
import { ResourceListComponent } from './resource-list/resource-list.component';

import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [ MenubarComponent, SpocDashboardComponent, FooterComponent, SpocProfileComponent, CreateListingManagerComponent, 
    CreateHiringManagerComponent, ResourceListComponent],
  imports: [
    CommonModule,
    SpocModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,MatRadioModule,MatSelectModule
  ]
})
export class SpocModuleModule { }
