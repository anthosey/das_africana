import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
// import { PopoverComponent } from '../popover/popover.component';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  constructor(private router: Router,
    private popoverController: PopoverController) { }

  ngOnInit() {
  }
  
  showCategories(x: any) {
    this.presentPopover(x);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  

  onHome(){
    this.router.navigateByUrl('home');
  }

  onRequest() {
this.router.navigateByUrl('services');
  }
}
