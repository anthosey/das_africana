import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { AuthUser } from '../model/auth-user';



@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.page.html',
  styleUrls: ['./changepass.page.scss'],
})
export class ChangepassPage implements OnInit {
  password_type: string = 'password';
  password;
  currentPass;
  newPass;
  confirmPass;
  userSub: Subscription;
  user: AuthUser;

  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }


    constructor(private router: Router, 
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ngOnDestroy() {  
    if(this.userSub) {
      this.userSub.unsubscribe();
    }
  }
  

  ionViewWillEnter(){
    // this.user = this.authService.getLoggedInUser();
      this.userSub = this.authService.inuser.subscribe(data =>{
      this.user = data;
        })
                
    }
  
onLogin(f: NgForm) {
    const username = this.user.email;
    // const password = f.value.password;

     if (this.newPass !== this.confirmPass) {
      this.presentAlert('New password not match', "Password error");
      return;
     }

    this.loadingCtrl.create({keyboardClose: true, message: 'Please wait..', spinner: 'lines'})
    .then(loadingEl => {
      loadingEl.present();

    this.authService.changePassword(username, this.currentPass, this.newPass)
    .then(resData => {
      loadingEl.dismiss();

      if (resData.status === 401) { // Account Not Verified
        // this.presentAlert('Your account has been deactivated, please contact your administrator', "Ashon");
        this.presentToast(resData.error.message);
        
        return;
      } 

      if (resData.status === 405) { // Account Not Verified
        this.authService.userEmail = username;
        this.presentToast(resData.error.message);
        this.router.navigateByUrl('confirm-mobile');
        return;
      } 

      if (resData.status === 406) { // Account Locked
        this.authService.userEmail = username;
        // this.presentToast(resData.error.message);
        // this.router.navigateByUrl('account-deactivated');
        this.presentAlert('Your account has been deactivated, please contact your administrator', "Ashon");
        return;
      } 

      if (resData.status === 500) { // Error exists
        this.presentToast(resData.error.message);
        return;
      } 

      if ( resData.status === 401 ) {
        this.presentToast('Incorrect username or password!');
        return;
      }

      f.reset();
      // console.log('Login DATA: ' + resData.token);

      this.authService.token = resData.token; // set token property
      
      this.authService.userEmail = username;

      // this.router.navigateByUrl('members');
      this.authService.logout();
      this.router.navigateByUrl('login');
    })
    .catch(err => {
      console.log('Error from Login::' + err);
    })

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

  async presentAlert(msg: string, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      // subHeader: 'Subtitle',
      message: msg,
      cssClass: "alertBg",
      buttons: ["Close"],
    });

    await alert.present();
  }
}
