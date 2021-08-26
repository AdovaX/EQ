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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { PopupEducationComponent } from './popup-education/popup-education.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
 

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
    TableComponent,
    PopupEducationComponent,
    EditResourceComponent,
    TimeSheetComponent, 
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
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      "backgroundPadding": 5,
      "radius": 14,
      "space": -10,
      "toFixed": 0,
      "maxPercent": 1000,
      "outerStrokeGradient": false,
      "outerStrokeWidth": 4, 
      "innerStrokeColor": "#fff",
      "innerStrokeWidth": 4, 
      "titleFontSize": "14",
      "imageHeight": 116,
      "animationDuration": 300,
      "showUnits": false,
      "showBackground": false,
      "showSubtitle":false,
      "lazy": true
    })
    
  ],
  entryComponents: [PopupDomainComponent,PopupTechnologyComponent],
  exports:[CommonModule],

})
export class CompanyModule { }
