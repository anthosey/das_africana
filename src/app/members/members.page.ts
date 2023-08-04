import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { MemberComponent } from '../member/member.component';
import { User } from '../model/user';
import { ModifyMemberComponent } from '../modify-member/modify-member.component';
import { PaymentComponent } from '../payment/payment.component';
import { PopoverComponent } from '../popover/popover.component';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../model/auth-user';
import { Subscription } from 'rxjs';
import { DeletememberComponent } from '../deletemember/deletemember.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  allMembers: User;  
  savedYear;
  user: AuthUser;
  name;
  userSub: Subscription;
  search: string;
  deleteEmail: string;
  constructor(private popoverController: PopoverController,
              public modalController: ModalController,
              public loadingCtrl: LoadingController,
              private authService: AuthService,
              private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.userSub = this.authService.inuser.subscribe(data =>{
      this.user = data;
      })
      console.log("user info: " + JSON.stringify(this.user));
  }
                          
              
ionViewWillEnter(){
  // this.user = this.authService.getLoggedInUser();
    this.userSub = this.authService.inuser.subscribe(data =>{
    this.user = data;
      })
              
  }

ionViewDidEnter() {
    // this.user = this.authService.getLoggedInUser();
    // this.name = this.authService.userEmail;
    this.name = this.user.firstName;
    console.log('USer::' + this.user);
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

  ngOnDestroy() {  
    if(this.userSub) {
      this.userSub.unsubscribe();
    }
  }
  



//   allMembers= [
//     {
//       name: 'Standard Union Securities Limited.', 
//       regFunction: 'Broker Dealer', 
//       email: 'office@standardun.com', 
//       phone: '08181283000', 
//       address: '1st Floor Shippers Plaza, 31 Ndola Crescent, Wuse zone 5 Abuja.',
//       accountStatus: 'Active'
//     },

//   {
//     name: 'Standard Union Securities Limited.', 
//     regFunction: 'Broker Dealer', 
//     email: 'office@standardun.com', 
//     phone: '08181283000', 
//     address: '1st Floor Shippers Plaza, 31 Ndola Crescent, Wuse zone 5 Abuja.',
//     accountStatus: 'Inactive'
//   }
// ];
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

  async presentDeleteModal(member: User) {
    const modal = await this.modalController.create({
      component: DeletememberComponent,
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


  onDelete(member: User) {
    console.log('Delete clicked!' + member);
    // this.presentDeleteModal(member);
    this.deleteEmail = member.email;
    this.presentAlertConfirmDelete("Are you sure you want to delete: " + member.name , "Confirm Delete");
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

  // async presentAlert(msg: string, title: string) {
  //   const alert = await this.alertController.create({
  //     header: title,
  //     // subHeader: 'Subtitle',
  //     message: msg,
  //     cssClass: "alertBg",
  //     buttons: ["Close"],
  //   });
  
  //   await alert.present();
  // }


  login() {
    this.router.navigateByUrl("login");
  }

  logout() {
    this.authService.logout();
    console.log('Logout clicked!');
    this.router.navigateByUrl("login");
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


  deleteMember() {

    this.loadingCtrl.create({keyboardClose: true, message: "Please wait..", spinner: "lines"})
    .then((loadingEl) => {
      loadingEl.present();

    this.authService.deleteMember(this.deleteEmail)
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
      this.presentAlert("Member deleted successfully!", "Success");
      // console.log('vehi::' + JSON.stringify(vehicles.data));
      // this.authService.allMembers = members.data;
      // this.allMembers = members.data;
      // this.allCities = cities.data;
      // this.requestService.allVehicles[1].
    
    }); // End of loading

  });
  }
  
  changePass() {
    this.router.navigateByUrl('changepass');
  }

  async presentAlertConfirmDelete(msg: string, title: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel clicked!');
          
          }
        }, {
          text: 'Yes delete',
          handler: () => {
            console.log('YEs clicked!');
          // Call Delete
            this.deleteMember();
            this.ionViewDidEnter();
        }
    }
      ]
    })
    await alert.present();
  }
  
}
