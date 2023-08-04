import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmTokenPageRoutingModule } from './confirm-token-routing.module';

import { ConfirmTokenPage } from './confirm-token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmTokenPageRoutingModule
  ],
  declarations: [ConfirmTokenPage]
})
export class ConfirmTokenPageModule {}
