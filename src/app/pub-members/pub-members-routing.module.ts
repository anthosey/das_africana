import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PubMembersPage } from './pub-members.page';

const routes: Routes = [
  {
    path: '',
    component: PubMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PubMembersPageRoutingModule {}
