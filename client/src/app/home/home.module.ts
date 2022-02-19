import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HomeinfoComponent } from './homeinfo/homeinfo.component';
import { HomemainComponent } from './homemain/homemain.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    HomeinfoComponent,
    HomemainComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
