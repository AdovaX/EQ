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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagmentRoutingModule { }
