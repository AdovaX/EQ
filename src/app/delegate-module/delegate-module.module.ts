import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 
import { DelegateModuleRoutingModule } from './delegate-module-routing.module';
import { MenubarComponent } from './menubar/menubar.component';
import { DelegateDashboardComponent } from './delegate-dashboard/delegate-dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { DelegateProfileComponent } from './delegate-profile/delegate-profile.component';
import { CreateSpocComponent } from './create-spoc/create-spoc.component';
import { CreateListingManagerComponent } from './create-listing-manager/create-listing-manager.component';
import { CreateHiringManagerComponent } from './create-hiring-manager/create-hiring-manager.component';
import { ResourceListComponent } from './resource-list/resource-list.component';

import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [ MenubarComponent, DelegateDashboardComponent, FooterComponent, 
    DelegateProfileComponent, CreateSpocComponent, CreateListingManagerComponent, 
    CreateHiringManagerComponent, ResourceListComponent],
  imports: [
    CommonModule,
    DelegateModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,MatRadioModule,MatSelectModule
  ]
})
export class DelegateModuleModule { }
