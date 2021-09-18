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
import { ProfileComponent } from './profile/profile.component';
import { IntroVideoComponent } from './intro-video/intro-video.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { DelegateManagementComponent } from './delegate-management/delegate-management.component';
import { SpocManagementComponent } from './spoc-management/spoc-management.component';
import { ChatComponent } from './chat/chat.component';

import { ChatHistoryComponent } from './chat-history/chat-history.component';
const routes: Routes = [
    {
      path : '', component:RegistrationComponent
    }, 
    {
      path : 'Chat', component:ChatComponent
    },
    {
      path : 'Chats', component:ChatHistoryComponent
    },
    {
      path : 'SpocManagement', component:SpocManagementComponent
    },   
    {
      path : 'DelegateManagement', component:DelegateManagementComponent
    }, 
    {
      path : 'TimeSheet', component:TimeSheetComponent
    }, 
    {
      path : 'Edit', component:EditResourceComponent
    },
    {
      path : 'Edit/:id', component:EditResourceComponent
    },
    {
      path : 'Dashboard', component:DashboardComponent
    }, 
    {
      path : 'Profile', component:ProfileComponent
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
  {
    path : 'IntroVideo/:id', component:IntroVideoComponent
  },
  { path: 'Projectmanagement', loadChildren: () => import('./project-managment/project-managment.module').then(m => m.ProjectManagmentModule) },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
