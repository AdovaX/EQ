import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListingManagerDashboardComponent } from './listing-manager-dashboard/listing-manager-dashboard.component';
import { HiringManagerDashboardComponent } from './hiring-manager-dashboard/hiring-manager-dashboard.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { LManagerProfileComponent } from './l-manager-profile/l-manager-profile.component';
import { SearchResourceComponent } from './search-resource/search-resource.component';
import { HManagerProfileComponent } from './h-manager-profile/h-manager-profile.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'Login', component:LoginComponent },
  { path: 'Listingmanager', component:ListingManagerDashboardComponent },
  { path: 'Hiringmanager', component:HiringManagerDashboardComponent },
  { path: 'Resources', component:CreateResourceComponent },
  { path: 'Profile', component:LManagerProfileComponent },
  { path: 'Search', component:SearchResourceComponent },
  { path: 'Update', component:HManagerProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LHManagerRoutingModule { }
