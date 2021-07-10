import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import { LHManagerRoutingModule } from './lhmanager-routing.module';
import { LoginComponent } from './login/login.component';
import { MenubarComponent } from './menubar/menubar.component';
import { FooterComponent } from './footer/footer.component';
import { ListingManagerDashboardComponent } from './listing-manager-dashboard/listing-manager-dashboard.component';
import { HiringManagerDashboardComponent } from './hiring-manager-dashboard/hiring-manager-dashboard.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { LManagerProfileComponent } from './l-manager-profile/l-manager-profile.component';
import { SearchResourceComponent } from './search-resource/search-resource.component';
import { HManagerProfileComponent } from './h-manager-profile/h-manager-profile.component';


@NgModule({
  declarations: [LoginComponent, MenubarComponent, FooterComponent, ListingManagerDashboardComponent, HiringManagerDashboardComponent, CreateResourceComponent, LManagerProfileComponent, SearchResourceComponent, HManagerProfileComponent],
  imports: [
    CommonModule,
    LHManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class LHManagerModule { }
