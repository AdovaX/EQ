import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';

import { ProjectManagmentRoutingModule } from './project-managment-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import {MenubarComponent} from './menubar/menubar.component';
import {FooterComponent} from './footer/footer.component';
import { CreateProjectComponent } from './create-project/create-project.component'; 
import {   MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';

import { CreateAssignmentsComponent } from './create-assignments/create-assignments.component';

@NgModule({
  declarations: [ProjectsComponent,MenubarComponent,FooterComponent, CreateProjectComponent, CreateAssignmentsComponent,],
  imports: [
    CommonModule,
    ProjectManagmentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatInputModule,MatButtonModule
  ]
})
export class ProjectManagmentModule { }
