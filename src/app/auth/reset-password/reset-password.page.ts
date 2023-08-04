import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
// import { Network } from '@ionic-native/network/ngx';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  disconnectSubscription: Subscription;
  constructor(private router: Router,
              private toastController: ToastController,
              private authService: AuthService,
              private loadingCtrl: LoadingController
              // , private network: Network
              ) { }

              ngOnInit() {
    
                // this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
                //   // console.log('network was disconnected :-(');
                //   this.presentSysMsg('Please check your internet connection')
                // });
            
              }
            
              ngOnDestroy() {
                if (this.disconnectSubscription) {
                  this.disconnectSubscription.unsubscribe();
                }
                
              }

              
    onCancel() {
    this.router.navigateByUrl('/login');
  }

  onSubmit(f: NgForm) {
    const password = f.value.password;
    const password2 = f.value.password2;
    const username = this.authService.userEmail;
    console.log(password);
    console.log(password2);
    
    if (password !== password2) {
      this.presentToast("Passwords not match!");
      return;
    }
    
    // return;

    this.loadingCtrl.create({keyboardClose: true, message: 'Please wait..', spinner: 'lines'})
    .then(loadingEl => {
      loadingEl.present();

    this.authService.resetPassword(username, password)
    .then(resData => {
      loadingEl.dismiss();
      if (resData.status === 401) { // Error exists
        this.presentToast(resData.error.message);
        return;
      } 

      if ( resData.status === 500 ) {
        this.presentToast('Server error occured!');
        return;
      }

      f.reset();
      // console.log('Login DATA: ' + resData.token);
      // this.authService.token = resData.token; // set token property
      this.presentToast('Password changed successfully!');
      this.router.navigateByUrl('/login');
    })
    .catch()

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
}
