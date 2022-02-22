import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { CartItem } from '../models/cart-item.interface';
import { Category } from '../models/category-interface';
import { Product } from '../models/product-interface';
import { AuthenticationService } from '../services/authentication.service';
import { CartService } from '../services/cart.service';
import { CategoriesService } from '../services/categories.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css"],
})
export class StoreComponent implements OnInit {

  products$ = this.productService.products$
  categories$ = this.categoriesService.categories$;
  cart$ = this.cartService.cart$;
  totalPrice$ = this.cartService.totalPrice$;
  user$  = this.authService.user$ ;

  constructor(private categoriesService: CategoriesService, private productService: ProductService, private cartService: CartService,private authService:AuthenticationService) { }

  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(take(1)).subscribe();

    this.categoriesService.currentCategory$
      .pipe(
        switchMap((category: Category | null) => {
          return this.productService.getProductsBySelectedCategory(category?.id);
        })
      )
      .subscribe();


  }

  onCategorySelected(category: Category) {
    this.categoriesService.setCurrentCategory(category);
  }

  addToCart(product: Product) {
    this.cartService
      .addToCart(product)
      .pipe(
        take(1),
        switchMap(() => this.cartService.getCart(this.authService.user?.id))
      )
      .subscribe();
  }

  removeFromCart(product: CartItem) {
    this.cartService.removeFromCart(product).pipe(take(1)).subscribe();
  }
}
