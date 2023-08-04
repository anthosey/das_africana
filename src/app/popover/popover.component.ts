import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private popoverController: PopoverController,
              private router: Router) { }

  ngOnInit() {}

  quickLinks  = [
                  {name: 'Home', link: 'home'}, 
                  {name: 'About us', link: 'about'}, 
                  {name: 'Our services', link: 'services'}, 
                  {name: 'Menu', link: 'menu'}, 
                  // {name: 'Members', link: 'members'}, 
                  // {name: 'Downloads', link: 'downloads'}, 
                  {name: 'Contact us', link: 'contact'}]


                
                
  onClose(link: string) {
    console.log('Clicked:' + link);
    this.router.navigateByUrl(link);
    this.DismissClick();    
  }
  
  async DismissClick() {
    await this.popoverController.dismiss();
      }
}
