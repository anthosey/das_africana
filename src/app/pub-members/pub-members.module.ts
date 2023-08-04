import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PubMembersPageRoutingModule } from './pub-members-routing.module';

import { PubMembersPage } from './pub-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PubMembersPageRoutingModule
  ],
  declarations: [PubMembersPage]
})
export class PubMembersPageModule {}
