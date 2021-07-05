import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms' 
import { FormsModule } from '@angular/forms';

import { SpocDelegateRoutingModule } from './spoc-delegate-routing.module';
import { LoginComponent } from './login/login.component';
import { MenubarComponent } from './menubar/menubar.component';


@NgModule({
  declarations: [LoginComponent, MenubarComponent],
  imports: [
    CommonModule,
    SpocDelegateRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SpocDelegateModule { }
