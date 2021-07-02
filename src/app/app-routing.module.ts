import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
