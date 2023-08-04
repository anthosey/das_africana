import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {

  constructor(public modalController: ModalController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private toastController: ToastController,
              private router: Router) { }

  ngOnInit() {}

  async DismissModal() {
    await this.modalController.dismiss();
  }
  
  closeModal() {
    this.DismissModal();
  }



onAddNew(f: NgForm) {
  // console.log('DIAL::' + this.dialCode);
  // if (!this.policyAccepted) {
  //   this.presentToast('You need to accept our privacy policy and terms of use before you proceed.');
  //   return;
  // }
  
  // console.log('MOB::' + f.value.name, f.value.email, f.value.phone, f.value.address, f.value.regFunction);
  // return;
    const registeredUser = new User(
                          f.value.name, 
                          f.value.email, 
                          f.value.phone,
                          f.value.address,
                          f.value.regFunction
                        );
  // this.authService.user = registeredUser;
  // this.authService.userEmail = f.value.email;
  this.loadingCtrl.create({keyboardClose: true, message: 'Please wait..', spinner: 'lines'})
  .then(loadingEl => {
    loadingEl.present();

  this.authService.registerMember(registeredUser)
  .then(resData => {

    loadingEl.dismiss();
    if (resData.status === 422 || resData.status === 500) { // Error exists
      let err = '';
      resData.error.data.forEach(error => {
        if (err === '') {
          err = error.msg;
        } else {err = err + ', ' + error.msg;}
        
      });
      console.log('All Error: ' + err);
      
      this.presentToastError(err);
      return;
    } 

    this.DismissModal();
  console.log('Member registered successfully!');
    // this.router.navigateByUrl('/confirm-mobile');
  
    // console.log('Data: '+ resData.error.message);
    // console.log('Status: ' +  resData.status);
 
  })  
  .catch(err => {
    console.log('Error2: ' + err);
  });
});
}

async presentToast(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 3000,
    color: 'danger',
    position: 'bottom',
    buttons: [
      {
        side: 'start',
        icon: 'alert'
      }
    ]
  });
  toast.present();
}

async presentSysMsg(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 3000,
    color: "light",
    position: "bottom",
    buttons: [
      {
        side: "start",
        icon: "alert",
      },
    ],
  });
  toast.present();
}

async presentToastError(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 3000,
    color: 'danger',
    position: 'bottom',
    buttons: [
      {
        side: 'start',
        icon: 'alert'
      }
    ]
  });
  toast.present();
}
}

