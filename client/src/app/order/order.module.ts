import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderformComponent } from './orderform/orderform.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderRoutingModule } from './order-routing.moudle';

@NgModule({
  declarations: [
    OrderComponent,
    OrderformComponent,
    OrderlistComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
