import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component'; 

const routes: Routes = [
  {path : '' , component:ProjectsComponent},
  {path : 'Projectmanagement' , component:ProjectsComponent},
  {path : 'Createproject' , component:CreateProjectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagmentRoutingModule { }
