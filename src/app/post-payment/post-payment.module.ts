import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPaymentPageRoutingModule } from './post-payment-routing.module';

import { PostPaymentPage } from './post-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPaymentPageRoutingModule
  ],
  declarations: [PostPaymentPage]
})
export class PostPaymentPageModule {}
