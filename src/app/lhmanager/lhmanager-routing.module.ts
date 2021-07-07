import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListingManagerDashboardComponent } from './listing-manager-dashboard/listing-manager-dashboard.component';
import { HiringManagerDashboardComponent } from './hiring-manager-dashboard/hiring-manager-dashboard.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'Login', component:LoginComponent },
  { path: 'Listingmanager', component:ListingManagerDashboardComponent },
  { path: 'Hiringmanager', component:HiringManagerDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LHManagerRoutingModule { }
