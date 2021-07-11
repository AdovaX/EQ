import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CreateSpocComponent } from './create-spoc/create-spoc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DelegateComponent } from './delegate/delegate.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

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
    path : 'ForgotPassword', component:DelegateComponent
  } , 
  {
    path : 'ForgotPassword', component:DelegateComponent
  } , 
  {
    path : 'Companyupdate', component:CompanyProfileComponent
  }   
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
