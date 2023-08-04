import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmTokenPage } from './confirm-token.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmTokenPageRoutingModule {}
