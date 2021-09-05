import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';

import {MatButtonModule} from '@angular/material/button';  

import {MatCardModule} from '@angular/material/card';

import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatMenuModule} from '@angular/material/menu';

import {SharedModuleModule} from '../shared-module/shared-module.module';

import { ResourceRoutingModule } from './resource-routing.module';
import { TimeSheetUpdateComponent } from './time-sheet-update/time-sheet-update.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalenderComponent } from './calender/calender.component';

@NgModule({
  declarations: [TimeSheetUpdateComponent, CalenderComponent],
  imports: [
    CommonModule,
    ResourceRoutingModule,
    ReactiveFormsModule,
FormsModule,
MatRadioModule,
MatSelectModule,
MatStepperModule,
MatButtonModule,
MatCardModule,
MatCheckboxModule,
MatMenuModule,
SharedModuleModule,
MatDatepickerModule,MatButtonModule,
CalendarModule.forRoot({
  provide: DateAdapter,
  useFactory: adapterFactory,
})
  ]
})
export class ResourceModule { }
