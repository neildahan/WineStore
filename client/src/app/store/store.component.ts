import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private categoriesService: CategoriesService, private productService: ProductService, private cartService: CartService,private authService:AuthenticationService,
    private activeRoute: ActivatedRoute) { }

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
    console.log(this.cartService.cart?.products)
    console.log(product);
    
    const _product = this.cartService.cart?.products.find(p => p.productId == product.id)
    console.log(_product)
    if (_product) {
      _product.quantity +=1;
      this.cartService.updateCartItemQty(_product).pipe(
        switchMap(() => this.cartService.getCart(this.authService.user?.id))
      ).subscribe()
      
    } else {

      this.cartService
      .addToCart(product)
      .pipe(
        take(1),
        switchMap(() => this.cartService.getCart(this.authService.user?.id))
      )
      .subscribe();
    }

  }

  removeFromCart(product: CartItem) {
    this.cartService.removeFromCart(product).pipe(take(1)).subscribe();
  }
}
