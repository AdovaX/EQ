import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import { ListingManagerModuleRoutingModule } from './listing-manager-module-routing.module';
import { MenubarComponent } from './menubar/menubar.component';
import { FooterComponent } from './footer/footer.component';
import { ListingManagerDashboardComponent } from './listing-manager-dashboard/listing-manager-dashboard.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { LManagerProfileComponent } from './l-manager-profile/l-manager-profile.component';


@NgModule({
  declarations: [MenubarComponent, FooterComponent, ListingManagerDashboardComponent, CreateResourceComponent, LManagerProfileComponent],
  imports: [
    CommonModule,
    ListingManagerModuleRoutingModule,
    CommonModule,
     ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class ListingManagerModuleModule { }
