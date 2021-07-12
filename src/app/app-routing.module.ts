import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'L2Dashboard', loadChildren: () => import('./delegate-module/delegate-module.module').then(m => m.DelegateModuleModule) },
  { path: 'L3Dashboard', loadChildren: () => import('./spoc-module/spoc-module.module').then(m => m.SpocModuleModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
