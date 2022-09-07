import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ShareModule} from '../share/share.module';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, InfoComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule
  ]
})
export class UserModule { }
