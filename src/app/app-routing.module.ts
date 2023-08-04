import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'code',
    loadChildren: () => import('./code/code.module').then( m => m.CodePageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule)
    ,
    canLoad: [AuthGuard]
  },
  {
    path: 'downloads',
    loadChildren: () => import('./downloads/downloads.module').then( m => m.DownloadsPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'confirm-email',
    loadChildren: () => import('./auth/confirm-email/confirm-email.module').then( m => m.ConfirmEmailPageModule)
  },
  {
    path: 'confirm-mobile',
    loadChildren: () => import('./auth/confirm-mobile/confirm-mobile.module').then( m => m.ConfirmMobilePageModule)
  },
  {
    path: 'confirm-token',
    loadChildren: () => import('./auth/confirm-token/confirm-token.module').then( m => m.ConfirmTokenPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'company-details',
    loadChildren: () => import('./company-details/company-details.module').then( m => m.CompanyDetailsPageModule)
    // , canLoad: [AuthGuard]
  },
  {
    path: 'modify-member',
    loadChildren: () => import('./modify-member/modify-member.module').then( m => m.ModifyMemberPageModule)
    , canLoad: [AuthGuard]
  },
  {
    path: 'post-payment',
    loadChildren: () => import('./post-payment/post-payment.module').then( m => m.PostPaymentPageModule)
    , canLoad: [AuthGuard]
  },
  {
    path: 'pub-members',
    loadChildren: () => import('./pub-members/pub-members.module').then( m => m.PubMembersPageModule)
  },
  {
    path: 'changepass',
    loadChildren: () => import('./changepass/changepass.module').then( m => m.ChangepassPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
