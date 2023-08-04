import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modify-member',
  templateUrl: './modify-member.component.html',
  styleUrls: ['./modify-member.component.scss'],
})
export class ModifyMemberComponent implements OnInit {
  @Input() memberData: User;
  name;
  address;
  email;
  phone;
  regFunction;

  constructor(private modalController: ModalController,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private toastController: ToastController
              ) { }

  ngOnInit() {
    this.name = this.memberData.name;
    this.address = this.memberData.address;
    this.email = this.memberData.email;
    this.phone = this.memberData.phone;
    this.regFunction = this.memberData.regFunction

  }

  async DismissModal() {
    await this.modalController.dismiss();
  }

  closeModal() {
    this.DismissModal();
  }

  updateRecord() {
    const member = new User(
      this.name, 
      this.email, 
      this.phone,
      this.address,
      this.regFunction
    );
    // this.authService.user = registeredUser;
    // this.authService.userEmail = f.value.email;
    this.loadingCtrl.create({keyboardClose: true, message: 'Please wait..', spinner: 'lines'})
    .then(loadingEl => {
    loadingEl.present();

    this.authService.updateMember(member)
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
    this.presentSysMsg("Member data updated successfully!")
    console.log('Member data updated successfully!');
    // this.router.navigateByUrl('/confirm-mobile');

    // console.log('Data: '+ resData.error.message);
    // console.log('Status: ' +  resData.status);

    })  
    .catch(err => {
    console.log('Error2: ' + err);
    });
    });
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
