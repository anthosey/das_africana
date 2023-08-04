import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, PopoverController } from '@ionic/angular';

import { MembersPageRoutingModule } from './members-routing.module';

import { MembersPage } from './members.page';
import { MemberComponent } from '../member/member.component';
import { PaymentComponent } from '../payment/payment.component';
import { ModifyMemberComponent } from '../modify-member/modify-member.component';
// import { PopoverComponent } from '../popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembersPageRoutingModule
  ],
  declarations: [MembersPage, MemberComponent, PaymentComponent, ModifyMemberComponent],
  entryComponents: [MemberComponent, PaymentComponent, ModifyMemberComponent]
  
})
export class MembersPageModule {}
