import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { Pay } from '../model/pay';
import { User } from '../model/user';

import { PopoverComponent } from '../popover/popover.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.page.html',
  styleUrls: ['./company-details.page.scss'],
})
export class CompanyDetailsPage implements OnInit {
  popoverController: any;
  // allMembers: User;  
  // paymentHistory: Pay [];

  constructor(popoverController: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertController: AlertController,
              private router: Router) { }

    member: User;
    paymentHistory: Pay;
    accountStatus ="UNPAID";
  ngOnInit() {
    this.member = this.authService.selectedUser;

    let email;
    email = this.authService.selectedUser.email;
    console.log('Member email::' + this.authService.selectedUser.email);
    console.log('Got here 1');
    // return;
    // Load Payment by member

  this.loadingCtrl.create({keyboardClose: true, message: "Please wait..", spinner: "lines"})
.then((loadingEl) => {
  loadingEl.present();

    // Get one member payment details
  this.authService.getOneMemberPayment(email)
  // this.authService.getMembers()
    .then(payments => {
      console.log('Got here 1');
      console.log('FRONT::' + payments);
      this.paymentHistory = payments;

      loadingEl.dismiss();
    
      // this.paymentHistory = payments.data;
    });


    // Get current year
    let currentYear = new Date().getFullYear();

    // Check if this person has paid for the current year
    this.authService.getCurrentYearPayment(email, currentYear)
    // this.authService.getMembers()
      .then(payments => {
        console.log('Got here 2');
        console.log('FRONT::' + payments);
        this.paymentHistory = payments;
  
          if (payments)       {
              // mark user account as paid
              this.accountStatus = 'PAID';
    
              this.authService.markOneUserPaid(email)
              // this.authService.getMembers()
              .then(userStatus => {
                console.log('Got here 3!');
              })

          } else {
            console.log('NOt paid for Current year:: ' + currentYear);
          }
        // this.paymentHistory = payments.data;
      });
     
  
  });// End of Loading
  }
 
  backHome() {
    this.router.navigateByUrl('members');
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

async presentAlert(msg: string, title: string) {
  const alert = await this.alertController.create({
    header: title,
    // subHeader: 'Subtitle',
    message: msg,
    cssClass: "alertBg",
    buttons: ["Close"],
  });

  await alert.present();
}


}
