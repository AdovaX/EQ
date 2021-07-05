import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SpocDashboardComponent } from './spoc-dashboard/spoc-dashboard.component';
import { DelegateDashboardComponent } from './delegate-dashboard/delegate-dashboard.component';
import { DelegateProfileComponent } from './delegate-profile/delegate-profile.component';


const routes: Routes = [
  {
    path : '', component:LoginComponent
  },{
    path : 'Login', component:LoginComponent
  }, {
    path : 'Spoc', component:SpocDashboardComponent
  }, {
    path : 'Delegate', component:DelegateDashboardComponent
  }, {
    path : 'Delegate/Profile', component:DelegateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpocDelegateRoutingModule { }
