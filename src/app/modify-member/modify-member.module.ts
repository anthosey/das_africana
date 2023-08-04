import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyMemberPageRoutingModule } from './modify-member-routing.module';

import { ModifyMemberPage } from './modify-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyMemberPageRoutingModule
  ],
  declarations: [ModifyMemberPage]
})
export class ModifyMemberPageModule {}
