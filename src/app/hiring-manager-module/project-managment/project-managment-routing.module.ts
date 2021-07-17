import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component'; 
import { CreateAssignmentsComponent } from './create-assignments/create-assignments.component';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';

const routes: Routes = [
  {path : '' , component:ProjectsComponent},
  {path : 'Projectmanagement' , component:ProjectsComponent},
  {path : 'Createproject' , component:CreateProjectComponent},
  {path : 'Createassignment/:id' , component:CreateAssignmentsComponent},
  {path : 'Requirements/:id' , component:ViewAssignmentsComponent},
  {path : 'ProjectDetails/:id' , component:ViewProjectsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagmentRoutingModule { }
