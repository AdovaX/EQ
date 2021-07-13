import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { HiringManagerDashboardComponent } from './hiring-manager-dashboard/hiring-manager-dashboard.component';

import { SearchResourceComponent } from './search-resource/search-resource.component';

import { HManagerProfileComponent } from './h-manager-profile/h-manager-profile.component';

const routes: Routes = [
  { path: '', component:HiringManagerDashboardComponent },

  { path: 'Dashboard', component:HiringManagerDashboardComponent },

  { path: 'Search', component:SearchResourceComponent },

  { path: 'Profile', component:HManagerProfileComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiringManagerModuleRoutingModule { }
