import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoreComponent } from './store.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { StoreRoutingModule } from './store-routing.moudle';
import { MatIconModule } from '@angular/material/icon';
import { ProductFormComponent } from './product-form/product-form.component';


@NgModule({
  declarations: [
    StoreComponent,
    CartComponent,
    CategoriesComponent,
    ProductsComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    MatIconModule
  ]
})
export class StoreModule { }
