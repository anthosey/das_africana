import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
// import { RequestService } from '../../services/request.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
// import { Network } from '@ionic-native/network/ngx';
import { Router } from "@angular/router";
// import { Geolocation } from "@ionic-native/geolocation/ngx";
// import { Socket } from "ngx-socket-io";
import { Subscription } from 'rxjs';
// import { Geoposition, GeolocationOptions } from "@ionic-native/geolocation/ngx";
// import {
//   BackgroundGeolocation,
//   BackgroundGeolocationResponse,
//   BackgroundGeolocationConfig,
// } from "@ionic-native/background-geolocation/ngx";

import { filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AuthUser } from '../../model/auth-user';

declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  lat: number;
  lng: number;
  accuracy: number;
  map: any;
  count = 0;
  geocoder: any;
  address;
  country;
  countryCode;
  city;
  // user: AuthUser;
  private _token: string;
  disconnectSubscription: Subscription;

  password_type: string = 'password';
  password;
  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

  constructor(private authService: AuthService,
              private toastController: ToastController,
              private loadingCtrl: LoadingController,
              // private locationAccuracy: LocationAccuracy,
              // private geolocation: Geolocation,
              // public zone: NgZone,
              // private network: Network,
              // private requestService: RequestService,
              private alertCtrl: AlertController,
              private splashscreen: SplashScreen,
              private router: Router) {
                // this.geocoder = new google.maps.Geocoder;
               }

  ngOnInit() {
    // this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   // console.log('network was disconnected :-(');
    //   this.presentSysMsg('Please check your internet connection')
    // });
    // this.getCurrentLocation();
  }

  onSignup() {
    // get Location and all
    this.loadingCtrl.create({keyboardClose: true, message: 'Getting things ready..', spinner: 'lines'})
    .then(loadingEl => {
      loadingEl.present();
      this.router.navigateByUrl('/register');

}); // End of loading Ctrl
}

ngOnDestroy() {
  if (this.disconnectSubscription) {
    this.disconnectSubscription.unsubscribe();
  }
 }

// async getCurrentLocation() {    
//   const coordinates = await this.geolocation.getCurrentPosition({enableHighAccuracy: true});
//     this.lat = coordinates.coords.latitude;
//     this.lng = coordinates.coords.longitude;
//     this.accuracy = coordinates.coords.accuracy;
//     console.log(this.lat,this.lng,this.accuracy);
 
// }

onLogin(f: NgForm) {
    const username = f.value.username;
    const password = f.value.password;
    this.loadingCtrl.create({keyboardClose: true, message: 'Please wait..', spinner: 'lines'})
    .then(loadingEl => {
      loadingEl.present();

    this.authService.login(username, password)
    .then(resData => {
      loadingEl.dismiss();

      if (resData.status === 405) { // Account Not Verified
        this.authService.userEmail = username;
        this.presentToast(resData.error.message);
        this.router.navigateByUrl('confirm-mobile');
        return;
      } 

      if (resData.status === 405) { // Account Locked
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

      this.router.navigateByUrl('members');
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
