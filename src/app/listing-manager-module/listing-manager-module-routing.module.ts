import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingManagerDashboardComponent } from './listing-manager-dashboard/listing-manager-dashboard.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { LManagerProfileComponent } from './l-manager-profile/l-manager-profile.component';


const routes: Routes = [ 

  { path: '', component:ListingManagerDashboardComponent },
  { path: 'Dashboard', component:ListingManagerDashboardComponent },
  { path: 'Resources', component:CreateResourceComponent },
  { path: 'Profile', component:LManagerProfileComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingManagerModuleRoutingModule { }
