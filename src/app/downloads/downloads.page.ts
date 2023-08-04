import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.page.html',
  styleUrls: ['./downloads.page.scss'],
})
export class DownloadsPage implements OnInit {


  constructor(private popoverController: PopoverController,
              private router: Router) { }

  ngOnInit() {
  }

  pdfUrl = './assets/downloads/cscs.pdf';
  pdfName = 'mySampleFile';
  

  downloadPdf(pdfUrl: string, pdfName: string ) {
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  openDoc(pdfUrl: string, startPage: number ) {
    window.open(pdfUrl + '#page=' + startPage, '_blank', '', true);
  }
  pdfFiles = [
    {
      title: 'This document describes who we are as an organization in the capital market.',
      name:'Corporate Profile',
      startPage: 1,
      path: './assets/downloads/corporate_profile.pdf'
    },
    
  ]

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

  login() {
    this.router.navigateByUrl("login");
  }
}
