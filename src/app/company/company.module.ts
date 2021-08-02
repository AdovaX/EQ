import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import { CompanyRoutingModule } from './company-routing.module';
import { RegistrationComponent } from './registration/registration.component';
 
// import {MenubarComponent} from '../menubar/menubar.component';
// import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from './login/login.component';
import { CreateSpocComponent } from './create-spoc/create-spoc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecaptchaModule } from "ng-recaptcha";
import { DelegateComponent } from './delegate/delegate.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CreateListingManagerComponent } from './create-listing-manager/create-listing-manager.component';
import { CreateHiringManagerComponent } from './create-hiring-manager/create-hiring-manager.component';
 import {SearchResourceComponent} from './search-resource/search-resource.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';  
import {CreateResourceComponent} from './create-resource/create-resource.component';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import { ProfileComponent } from './profile/profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [RegistrationComponent, 
    //MenubarComponent, 
    LoginComponent, CreateSpocComponent, DashboardComponent, 
    //FooterComponent, 
    DelegateComponent, CompanyProfileComponent,CreateListingManagerComponent,CreateHiringManagerComponent,SearchResourceComponent,
    CreateResourceComponent,
    ProfileComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatRadioModule,
    MatSelectModule,
    RecaptchaModule,
    ReactiveFormsModule,
    FormsModule, 
    MatStepperModule,
    MatButtonModule,
    SharedModuleModule,
    MatCardModule,
    MatCheckboxModule
    
  ]
})
export class CompanyModule { }
