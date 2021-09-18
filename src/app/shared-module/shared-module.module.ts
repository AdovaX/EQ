import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {MenubarComponent} from './menubar/menubar.component';
import {FooterComponent} from './footer/footer.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [MenubarComponent,FooterComponent],
  imports: [
    CommonModule, RouterModule,MatBadgeModule,MatMenuModule
  ],
  exports:[
    MenubarComponent,FooterComponent
  ],
})
export class SharedModuleModule { }
