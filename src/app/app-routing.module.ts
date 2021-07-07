import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'manager', loadChildren: () => import('./spoc-delegate/spoc-delegate.module').then(m => m.SpocDelegateModule) },
  { path: 'listing', loadChildren: () => import('./lhmanager/lhmanager.module').then(m => m.LHManagerModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
