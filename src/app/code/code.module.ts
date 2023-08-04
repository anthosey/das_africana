import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodePageRoutingModule } from './code-routing.module';

import { CodePage } from './code.page';
import { PopoverComponent } from '../popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodePageRoutingModule
  ],
  declarations: [CodePage]
  // entryComponents: [PopoverComponent]
})
export class CodePageModule {}
