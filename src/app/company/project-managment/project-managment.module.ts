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

@NgModule({
  declarations: [ProjectsComponent, CreateProjectComponent, CreateAssignmentsComponent, ViewAssignmentsComponent, ViewProjectsComponent, FindMachingComponent,],
  imports: [
    CommonModule,
    ProjectManagmentRoutingModule,
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
    MatCardModule
  ]
})
export class ProjectManagmentModule { }
