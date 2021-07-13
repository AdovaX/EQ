import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'L2Dashboard', loadChildren: () => import('./delegate-module/delegate-module.module').then(m => m.DelegateModuleModule) },
  { path: 'L3Dashboard', loadChildren: () => import('./spoc-module/spoc-module.module').then(m => m.SpocModuleModule) },
  { path: 'L4Dashboard', loadChildren: () => import('./listing-manager-module/listing-manager-module.module').then(m => m.ListingManagerModuleModule) },
  { path: 'L5Dashboard', loadChildren: () => import('./hiring-manager-module/hiring-manager-module.module').then(m => m.HiringManagerModuleModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
