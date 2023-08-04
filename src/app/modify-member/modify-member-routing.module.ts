import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyMemberPage } from './modify-member.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyMemberPageRoutingModule {}
