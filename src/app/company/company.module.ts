import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import { CompanyRoutingModule } from './company-routing.module';
import { RegistrationComponent } from './registration/registration.component'; 
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
import {MatMenuModule} from '@angular/material/menu';
import { IntroVideoComponent } from './intro-video/intro-video.component'; 
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupDomainComponent } from './popup-domain/popup-domain.component';
import { MatInputModule } from '@angular/material/input';
import { PopupRoleComponent } from './popup-role/popup-role.component';
import { PopupTechnologyComponent } from './popup-technology/popup-technology.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { TableComponent } from './table/table.component'; 
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [RegistrationComponent, 
    //MenubarComponent, 
    LoginComponent, CreateSpocComponent, DashboardComponent, 
    //FooterComponent, 
    DelegateComponent, CompanyProfileComponent,CreateListingManagerComponent,CreateHiringManagerComponent,SearchResourceComponent,
    CreateResourceComponent,
    ProfileComponent,
    IntroVideoComponent,
    PopupRoleComponent,
    PopupTechnologyComponent,
    TableComponent
      ],
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
    MatCheckboxModule,
    MatMenuModule,
    NgxDropzoneModule,
    MatDialogModule,
    MatInputModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  entryComponents: [PopupDomainComponent,PopupTechnologyComponent],
  exports:[CommonModule],

})
export class CompanyModule { }
