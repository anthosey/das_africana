import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
// import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit, OnDestroy {
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
    //  });
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
    
    // return;

    var username = f.value.username;
    console.log('b4::' + username);
    this.loadingCtrl.create({keyboardClose: true, message: 'Please wait..', spinner: 'lines'})
    .then(loadingEl => {
      loadingEl.present();
      
    this.authService.forgotPassword(username)
    .then(resData => {
      loadingEl.dismiss();
      if (resData.status === 401) { // Error exists
        this.presentToast(resData.error.message);
        return;
      } 

      if ( resData.status === 500 ) {
        this.presentToast('Invalid username!');
        return;
      }

      f.reset();
      // console.log('Login DATA: ' + resData.token);
      // this.authService.token = resData.token; // set token property
      console.log('IN::' + resData.email);
      this.authService.userEmail = resData.email;
      this.router.navigateByUrl('/confirm-token');
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
