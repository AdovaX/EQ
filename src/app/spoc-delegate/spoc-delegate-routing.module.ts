import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SpocDashboardComponent } from './spoc-dashboard/spoc-dashboard.component';
import { DelegateDashboardComponent } from './delegate-dashboard/delegate-dashboard.component';
import { DelegateProfileComponent } from './delegate-profile/delegate-profile.component';
import { CreateSpocComponent } from './create-spoc/create-spoc.component';
import { SpocProfileComponent } from './spoc-profile/spoc-profile.component';
import { CreateListingManagerComponent } from './create-listing-manager/create-listing-manager.component';
import { CreateHiringManagerComponent } from './create-hiring-manager/create-hiring-manager.component';
import { ResourceListComponent } from './resource-list/resource-list.component';


const routes: Routes = [
  {
    path : '', component:LoginComponent
  }, {
    path : 'Spoc', component:SpocDashboardComponent
  }, {
    path : 'Delegate', component:DelegateDashboardComponent
  }, {
    path : 'Delegate/Profile', component:DelegateProfileComponent
  }, {
    path : 'Delegate/CreateSpoc', component:CreateSpocComponent
  }, {
    path : 'Spoc/Profile', component:SpocProfileComponent
  },{
    path : 'Spoc/Listingmanagers', component:CreateListingManagerComponent
  },{
    path : 'Spoc/Hiringmanagers', component:CreateHiringManagerComponent
  },{
    path : 'Spoc/Resources', component:ResourceListComponent
  },{
    path : 'Delegate/Resources', component:ResourceListComponent
  },{
    path : 'Delegate/Listingmanagers', component:CreateListingManagerComponent
  },{
    path : 'Delegate/Hiringmanagers', component:CreateHiringManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpocDelegateRoutingModule { }
