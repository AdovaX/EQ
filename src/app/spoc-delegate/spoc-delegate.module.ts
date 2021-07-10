import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';

import { SpocDelegateRoutingModule } from './spoc-delegate-routing.module';
import { LoginComponent } from './login/login.component';
import { MenubarComponent } from './menubar/menubar.component';
import { SpocDashboardComponent } from './spoc-dashboard/spoc-dashboard.component';
import { DelegateDashboardComponent } from './delegate-dashboard/delegate-dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { DelegateProfileComponent } from './delegate-profile/delegate-profile.component';
import { CreateSpocComponent } from './create-spoc/create-spoc.component';
import { SpocProfileComponent } from './spoc-profile/spoc-profile.component';
import { CreateListingManagerComponent } from './create-listing-manager/create-listing-manager.component';
import { CreateHiringManagerComponent } from './create-hiring-manager/create-hiring-manager.component';
import { ResourceListComponent } from './resource-list/resource-list.component';

import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [LoginComponent, MenubarComponent, SpocDashboardComponent, DelegateDashboardComponent, FooterComponent, DelegateProfileComponent, CreateSpocComponent, SpocProfileComponent, CreateListingManagerComponent, CreateHiringManagerComponent, ResourceListComponent],
  imports: [
    CommonModule,
    SpocDelegateRoutingModule,
    ReactiveFormsModule,
    FormsModule,MatRadioModule,MatSelectModule
    
  ]
})
export class SpocDelegateModule { }
