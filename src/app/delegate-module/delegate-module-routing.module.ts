import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelegateDashboardComponent } from './delegate-dashboard/delegate-dashboard.component';
import { DelegateProfileComponent } from './delegate-profile/delegate-profile.component';
import { CreateSpocComponent } from './create-spoc/create-spoc.component';
import { CreateListingManagerComponent } from './create-listing-manager/create-listing-manager.component';
import { CreateHiringManagerComponent } from './create-hiring-manager/create-hiring-manager.component';
import { ResourceListComponent } from './resource-list/resource-list.component';

const routes: Routes = [
  {
    path : '', component:DelegateDashboardComponent
  },{
    path : 'L2Dashboard', component:DelegateDashboardComponent
  },{
    path : 'Profile', component:DelegateProfileComponent
  }, {
    path : 'CreateSpoc', component:CreateSpocComponent
  },{
    path : 'Resources', component:ResourceListComponent
  },{
    path : 'Listingmanagers', component:CreateListingManagerComponent
  },{
    path : 'Hiringmanagers', component:CreateHiringManagerComponent
  },
  { path: 'Projectmanagement', loadChildren: () => import('./project-managment/project-managment.module').then(m => m.ProjectManagmentModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelegateModuleRoutingModule { }
