import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';

import { ProjectManagmentRoutingModule } from './project-managment-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component'; 
import {   MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

import { CreateAssignmentsComponent } from './create-assignments/create-assignments.component';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { FindMachingComponent } from './find-maching/find-maching.component';
import {MatTableModule} from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort'; 
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import {PopupInterviewDateComponent} from './popup-interview-date/popup-interview-date.component';
import { InterviewSheduleComponent } from './interview-shedule/interview-shedule.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { InterviewingResourcesListsComponent } from './interviewing-resources-lists/interviewing-resources-lists.component';
import { MyResourcesComponent } from './my-resources/my-resources.component';
import { RequestsComponent } from './requests/requests.component';
import { ApprovedResourcesComponent } from './approved-resources/approved-resources.component';
import { ShortListedResourcesComponent } from './short-listed-resources/short-listed-resources.component';
import { CalenderComponent } from './calender/calender.component';
 
import { PopUpTimesheetComponent } from './pop-up-timesheet/pop-up-timesheet.component';
import {MatChipsModule} from '@angular/material/chips';


import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ApproveTimesheetComponent } from './approve-timesheet/approve-timesheet.component';
import { RejectionReasonComponent } from './rejection-reason/rejection-reason.component';
import { PopupRejectReasonComponent } from './popup-reject-reason/popup-reject-reason.component';
FullCalendarModule.registerPlugins([  
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [ProjectsComponent, CreateProjectComponent, CreateAssignmentsComponent, ViewAssignmentsComponent, ViewProjectsComponent, FindMachingComponent, 
    BookmarksComponent,PopupInterviewDateComponent, InterviewSheduleComponent, InterviewingResourcesListsComponent, MyResourcesComponent, RequestsComponent, ApprovedResourcesComponent, ShortListedResourcesComponent, CalenderComponent, PopUpTimesheetComponent, ApproveTimesheetComponent, RejectionReasonComponent, PopupRejectReasonComponent],
  imports: [
    CommonModule,
    ProjectManagmentRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatInputModule,MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTooltipModule, 
    MatChipsModule,
    EditorModule, 
    NgCircleProgressModule.forRoot({
      // set defaults here
      "backgroundPadding": 5,
      "radius": 20,
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
  ]
})
export class ProjectManagmentModule { }
