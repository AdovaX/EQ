import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CreateSpocComponent } from './create-spoc/create-spoc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DelegateComponent } from './delegate/delegate.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CreateListingManagerComponent } from './create-listing-manager/create-listing-manager.component';
import { CreateHiringManagerComponent } from './create-hiring-manager/create-hiring-manager.component';
import {SearchResourceComponent} from './search-resource/search-resource.component';
import {CreateResourceComponent} from './create-resource/create-resource.component';
const routes: Routes = [
    {
      path : '', component:RegistrationComponent
    }, 
  {
    path : 'Dashboard', component:DashboardComponent
  }, 
  {
    path : 'Login', component:LoginComponent
  }, 
  {
    path : 'CreateSpoc', component:CreateSpocComponent
  } , 
  {
    path : 'CreateDelegate', component:DelegateComponent
  } , 
  {
    path : 'Listing', component:CreateListingManagerComponent
  } , 
  {
    path : 'Hiring', component:CreateHiringManagerComponent
  } , 
  {
    path : 'Resources', component:CreateResourceComponent
  } , 
  {
    path : 'Search', component:SearchResourceComponent
  } ,
  {
    path : 'ForgotPassword', component:RegistrationComponent
  } , 
  {
    path : 'Companyupdate', component:CompanyProfileComponent
  },
  { path: 'Projectmanagement', loadChildren: () => import('./project-managment/project-managment.module').then(m => m.ProjectManagmentModule) },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
