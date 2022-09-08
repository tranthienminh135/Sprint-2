import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ShareModule} from '../share/share.module';
import {InfoComponent} from './info/info.component';
import {CheckoutComponent} from './checkout/checkout.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, InfoComponent, CheckoutComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule
  ]
})
export class UserModule { }
