import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpocDashboardComponent } from './spoc-dashboard/spoc-dashboard.component';
import { SpocProfileComponent } from './spoc-profile/spoc-profile.component';
import { CreateHiringManagerComponent } from './create-hiring-manager/create-hiring-manager.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { CreateListingManagerComponent } from './create-listing-manager/create-listing-manager.component';



const routes: Routes = [
  {
    path : '', component:SpocDashboardComponent
  },{
    path : 'L3Dashboard', component:SpocDashboardComponent
  }, {
    path : 'Profile', component:SpocProfileComponent
  },{
    path : 'Listingmanagers', component:CreateListingManagerComponent
  },{
    path : 'Hiringmanagers', component:CreateHiringManagerComponent
  },{
    path : 'Resources', component:ResourceListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpocModuleRoutingModule { }
