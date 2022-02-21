import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoreComponent } from './store.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { StoreRoutingModule } from './store-routing.moudle';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    StoreComponent,
    CartComponent,
    CategoriesComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    MatIconModule
  ]
})
export class StoreModule { }
