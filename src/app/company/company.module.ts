import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import { CompanyRoutingModule } from './company-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { MenubarComponent } from './menubar/menubar.component';
import { LoginComponent } from './login/login.component';
import { CreateSpocComponent } from './create-spoc/create-spoc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecaptchaModule } from "ng-recaptcha";
import { FooterComponent } from './footer/footer.component';
import { DelegateComponent } from './delegate/delegate.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';


@NgModule({
  declarations: [RegistrationComponent, MenubarComponent, LoginComponent, CreateSpocComponent, DashboardComponent, FooterComponent, DelegateComponent, CompanyProfileComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatRadioModule,
    MatSelectModule,
    RecaptchaModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class CompanyModule { }
