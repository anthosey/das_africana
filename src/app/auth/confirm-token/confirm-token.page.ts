import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
// import { Network } from '@ionic-native/network/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-token',
  templateUrl: './confirm-token.page.html',
  styleUrls: ['./confirm-token.page.scss'],
})
export class ConfirmTokenPage implements OnInit {
  email: string;
  disconnectSubscription: Subscription;
  constructor(private router: Router,
    private toastController: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController
    // ,private network: Network
    ) { }

  ngOnInit() {
    this.email = this.authService.userEmail;
    // this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   // console.log('network was disconnected :-(');
    //   this.presentSysMsg('Please check your internet connection')
    // });

  }

  ionViewWillEnter() {
    this.email = this.authService.userEmail;
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
    // console.log(f.value.token);
    const token = f.value.token;
    this.email = this.authService.userEmail;
    // return;

    this.loadingCtrl.create({keyboardClose: true, message: 'Please wait..', spinner: 'lines'})
    .then(loadingEl => {
      loadingEl.present();
      
    this.authService.confirmToken(this.email, token)
    .then(resData => {
      loadingEl.dismiss();
      if (resData.status === 401) { // Error exists
        this.presentToast(resData.error.message);
        return;
      } 

      if ( resData.status === 500 ) {
        this.presentToast('Incorrect username or password!');
        return;
      }

      f.reset();
      // console.log('Login DATA: ' + resData.token);
      // this.authService.token = resData.token; // set token property
      this.router.navigateByUrl('/reset-password');
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
