import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { User } from '../model/user';
import { Pay } from '../model/pay';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() coys: User [];
  year = new Date().getFullYear();

  constructor(private modalController: ModalController,
              private toastController: ToastController,
              private loadingCtrl: LoadingController,
              private authService: AuthService) { }
//   allMembers= [
//     {
//       name: 'Standard 2', 
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

  ngOnInit() {
    // console.log('nonINIT is here');

  }

  async DismissModal() {
    await this.modalController.dismiss();
  }

  closeModal() {
    this.DismissModal();
  }

  onAddPayment(f: NgForm) {
    let email;
    for (let i = 0; i < this.coys.length; i++) {
      if (this.coys[i].name === f.value.name) {
        email = this.coys[i].email;
      }
    }

    console.log('The Email is::' + email);
    // return;
      const paymentData = new Pay(
                            email,
                            f.value.name, 
                            f.value.paymentMode, 
                            f.value.paymentDate,
                            f.value.paymentYear,
                            f.value.amount
                          );


                          console.log('name:' + f.value.name + ', mode:' + f.value.paymentMode + ', Year:' + f.value.paymentYear + ', amount:' + f.value.amount + ', Date:' + f.value.paymentDate);
    // this.authService.user = registeredUser;
    // this.authService.userEmail = f.value.email;
    this.loadingCtrl.create({keyboardClose: true, message: 'Please wait..', spinner: 'lines'})
    .then(loadingEl => {
      loadingEl.present();
  
    this.authService.postPayment(paymentData)
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
