import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeSheetUpdateComponent } from './time-sheet-update/time-sheet-update.component';
import { CalenderComponent } from './calender/calender.component';

const routes: Routes = [
  {
    path : '', component:TimeSheetUpdateComponent
  },{
    path : 'Timesheet', component:TimeSheetUpdateComponent
  },{
    path : 'Calender', component:CalenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
