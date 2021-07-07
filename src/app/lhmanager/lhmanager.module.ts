import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';

import { LHManagerRoutingModule } from './lhmanager-routing.module';
import { LoginComponent } from './login/login.component';
import { MenubarComponent } from './menubar/menubar.component';
import { FooterComponent } from './footer/footer.component';
import { ListingManagerDashboardComponent } from './listing-manager-dashboard/listing-manager-dashboard.component';
import { HiringManagerDashboardComponent } from './hiring-manager-dashboard/hiring-manager-dashboard.component';


@NgModule({
  declarations: [LoginComponent, MenubarComponent, FooterComponent, ListingManagerDashboardComponent, HiringManagerDashboardComponent],
  imports: [
    CommonModule,
    LHManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LHManagerModule { }
