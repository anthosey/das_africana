import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { PopoverComponent } from '../popover/popover.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
    // FooterComponent
  ],
  declarations: [HomePage, PopoverComponent],
  entryComponents: [PopoverComponent]
})
export class HomePageModule {}
