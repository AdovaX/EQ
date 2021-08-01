import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {MenubarComponent} from './menubar/menubar.component';
import {FooterComponent} from './footer/footer.component';


@NgModule({
  declarations: [MenubarComponent,FooterComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports:[
    MenubarComponent,FooterComponent
  ],
})
export class SharedModuleModule { }
