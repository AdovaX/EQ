import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';

import { SpocDelegateRoutingModule } from './spoc-delegate-routing.module';
import { LoginComponent } from './login/login.component';
import { MenubarComponent } from './menubar/menubar.component';
import { SpocDashboardComponent } from './spoc-dashboard/spoc-dashboard.component';
import { DelegateDashboardComponent } from './delegate-dashboard/delegate-dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { DelegateProfileComponent } from './delegate-profile/delegate-profile.component';


@NgModule({
  declarations: [LoginComponent, MenubarComponent, SpocDashboardComponent, DelegateDashboardComponent, FooterComponent, DelegateProfileComponent],
  imports: [
    CommonModule,
    SpocDelegateRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SpocDelegateModule { }
