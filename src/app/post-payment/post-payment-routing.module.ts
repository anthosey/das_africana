import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostPaymentPage } from './post-payment.page';

const routes: Routes = [
  {
    path: '',
    component: PostPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPaymentPageRoutingModule {}
