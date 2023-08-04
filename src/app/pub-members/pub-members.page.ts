// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-pub-members',
//   templateUrl: './pub-members.page.html',
//   styleUrls: ['./pub-members.page.scss'],
// })
// export class PubMembersPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { MemberComponent } from '../member/member.component';
import { User } from '../model/user';
import { ModifyMemberComponent } from '../modify-member/modify-member.component';
import { PaymentComponent } from '../payment/payment.component';
import { PopoverComponent } from '../popover/popover.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pub-members',
  templateUrl: './pub-members.page.html',
  styleUrls: ['./pub-members.page.scss'],

})
export class PubMembersPage implements OnInit {
  allMembers: User;  
  savedYear;
  search: string;

  constructor(private popoverController: PopoverController,
              public modalController: ModalController,
              public loadingCtrl: LoadingController,
              private authService: AuthService,
              private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
    if (!this.authService.allMembers) {
      console.log('Datbase refreshed!');
    // Get all Members
    this.loadingCtrl.create({keyboardClose: true, message: "Please wait..", spinner: "lines"})
    .then((loadingEl) => {
      loadingEl.present();

        // Get all members
      this.authService.getMembers()
        .then(members => {
          if (members.status === 403) { // Authentication Error exists
            this.presentAlert('Your session has expired, please login again.', "AUTHENTICATION ERROR");
            loadingEl.dismiss();
            this.authService.logout();
            return;
          }

          if (members.status === 401) { // Error exists
            this.presentAlert(members.error.message, "Error");
            loadingEl.dismiss();
            return;
          } 

          if ( members.status === 500 ) {
            // this.presentToastMsg(usr.error.message);
            this.presentAlert(members.error.message, "System Error");
            loadingEl.dismiss();
            return;
          }

          loadingEl.dismiss();
          // console.log('vehi::' + JSON.stringify(vehicles.data));
          this.authService.allMembers = members.data;
          this.allMembers = members.data;
          // this.allCities = cities.data;
          // this.requestService.allVehicles[1].
        
        });
      
      });// End of Loading
  } else {
    this.allMembers = this.authService.allMembers;
    console.log('Database NOT refreshed!');
  }    


  // Get the saved year
  this.authService.getSavedSettings()
        .then(settings => {
        
          this.authService.savedYear = settings.currentYear;
          this.savedYear = settings.currentYear;
          console.log('Saved year::' +  this.savedYear);

          // Get current year
          let currentYear = new Date().getFullYear();
          // let currentYear = now. getFullYear();

          console.log('CURR::' + currentYear + ', Saved::' + this.savedYear);
          if (currentYear > this.savedYear)  {
            console.log('Got hia!');
            // Refresh all the database, changing everyone's status to unpaid

          this.authService.updateallmembersunpaid()
            .then(alluser => { 
            console.log('DONE!::' + alluser);
          })

          // Update the saved year
          this.authService.updateSettings()
            .then(settings => { 
            console.log('Saved Year Updated!::');
          })

          }
        
    });
     

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

  showCategories(x: any) {
    this.presentPopover(x);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MemberComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  async presentPaymentModal() {
    const modal = await this.modalController.create({
      component: PaymentComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        coys: this.allMembers
        // 'firstName': 'Douglas',
        // 'lastName': 'Adams',
        // 'middleInitial': 'N'
      }

    });
    return await modal.present();
  }  

  async presentModifyModal(member: User) {
    const modal = await this.modalController.create({
      component: ModifyMemberComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        memberData: member
        // 'firstName': 'Douglas',
        // 'lastName': 'Adams',
        // 'middleInitial': 'N'
      }

    });
    return await modal.present();
  }  

  addMember() {
    console.log('Add member clicked!');
    this.presentModal();
  }

  postPayment() {
    console.log('Post Payment clicked!');
    this.presentPaymentModal();
  }


  closeModal() {
    this.modalController.dismiss();
  }

  onModify(member: User) {
    console.log('Modify clicked!' + member);
    this.presentModifyModal(member);
  }

  onDetails(member: User) {
    console.log('Details clickd!' + member.address);
    this.authService.selectedUser = member;
    this.router.navigateByUrl('company-details');
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

  login() {
    this.router.navigateByUrl("login");
  }

  greet() {
    alert("Hello");
  }
  getOneMember() {

    this.loadingCtrl.create({keyboardClose: true, message: "Please wait..", spinner: "lines"})
    .then((loadingEl) => {
      loadingEl.present();

    this.authService.getOneMember(this.search)
    .then(members => {
      if (members.status === 403) { // Authentication Error exists
        this.presentAlert('Your session has expired, please login again.', "AUTHENTICATION ERROR");
        loadingEl.dismiss();
        this.authService.logout();
        return;
      }

      if (members.status === 401) { // Error exists
        this.presentAlert(members.error.message, "Error");
        loadingEl.dismiss();
        return;
      } 

      if ( members.status === 500 ) {
        // this.presentToastMsg(usr.error.message);
        this.presentAlert(members.error.message, "System Error");
        loadingEl.dismiss();
        return;
      }

      loadingEl.dismiss();
      // console.log('vehi::' + JSON.stringify(vehicles.data));
      this.authService.allMembers = members.data;
      this.allMembers = members.data;
      // this.allCities = cities.data;
      // this.requestService.allVehicles[1].
    
    }); // End of loading

  });
  }
  
}
