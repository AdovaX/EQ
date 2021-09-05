import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component'; 
import { CreateAssignmentsComponent } from './create-assignments/create-assignments.component';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { FindMachingComponent } from './find-maching/find-maching.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { InterviewSheduleComponent } from './interview-shedule/interview-shedule.component';
import { InterviewingResourcesListsComponent } from './interviewing-resources-lists/interviewing-resources-lists.component';
import { MyResourcesComponent } from './my-resources/my-resources.component';
import { RequestsComponent } from './requests/requests.component';
import { ApprovedResourcesComponent } from './approved-resources/approved-resources.component';
import { ShortListedResourcesComponent } from './short-listed-resources/short-listed-resources.component';
import { CalenderComponent } from './calender/calender.component';
import { ApproveTimesheetComponent } from './approve-timesheet/approve-timesheet.component';

const routes: Routes = [
  {path : '' , component:ProjectsComponent},
  {path : 'Projectmanagement' , component:ProjectsComponent},
  {path : 'Createproject' , component:CreateProjectComponent},
  {path : 'Createassignment/:id' , component:CreateAssignmentsComponent},
  {path : 'Requirements/:id' , component:ViewAssignmentsComponent},
  {path : 'ProjectDetails/:id' , component:ViewProjectsComponent},
  {path : 'Findmaching/:id' , component:FindMachingComponent},
  {path : 'Bookmarks' , component:BookmarksComponent},
  {path : 'InterviewShedule' , component:InterviewSheduleComponent},
  {path : 'Interviewing' , component:InterviewingResourcesListsComponent},
  {path : 'MyResources' , component:MyResourcesComponent},
  {path : 'Requests' , component:RequestsComponent},
  {path : 'ApprovedResources' , component:ApprovedResourcesComponent},
  {path : 'ShortLists' , component:ShortListedResourcesComponent},
  {path : 'Calender' , component:CalenderComponent},
  {path : 'ApproveTimeSheet' , component:ApproveTimesheetComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagmentRoutingModule { }
