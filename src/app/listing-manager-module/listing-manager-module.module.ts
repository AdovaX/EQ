import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {SharedModuleModule} from '../shared-module/shared-module.module';

import { ListingManagerModuleRoutingModule } from './listing-manager-module-routing.module';
import { ListingManagerDashboardComponent } from './listing-manager-dashboard/listing-manager-dashboard.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { LManagerProfileComponent } from './l-manager-profile/l-manager-profile.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [  ListingManagerDashboardComponent, CreateResourceComponent, LManagerProfileComponent],
  imports: [
    CommonModule,
    ListingManagerModuleRoutingModule,
    CommonModule,SharedModuleModule,
     ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule
  ]
})
export class ListingManagerModuleModule { }
