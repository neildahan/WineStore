import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, map, tap } from 'rxjs';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response.interface';
import { Cart } from '../models/cart-interface';
import { Product } from '../models/product-interface';
import { CartItem } from '../models/cart-item.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cartChange = new BehaviorSubject<Cart | null>(null)
  public search = new BehaviorSubject<string>("")
  cart$ = this.cartChange.asObservable()
  totalPrice$ = this.cart$.pipe(
    map((cart) => cart?.products.map((product) => product).map((a: CartItem) => {
      a.totalPrice = a.quantity * (a.price || 0);
     return a
    }).map(p => p.totalPrice).reduce((a, b) => a + b, 0))
  );

  get cart() {
    return this.cartChange.value
  }
  constructor(private http: HttpClient, private productService: ProductService) { }



  getCart(userId: number | undefined) {
    return this.http.get<BaseResponse<Cart>>(environment.baseUrl + "/carts/active/" + userId).pipe(
      map(res => {
        this.setCart(res.data)
        return res.data
      })
    )
  }


  setCart(cart: Cart) {
    this.cartChange.next(cart);
  }



  addToCart(product: Product) {
    console.log(this.cartChange.value?.products)
    const cartItem = new CartItem(product, this.cartChange.value?.id || 55, 1);
    console.log(cartItem)
    return this.http.post(environment.baseUrl + "/carts/addItem", cartItem).pipe(
      tap(res => res)
    )
  }


  // addToCart(product: Product) {
// this.cart$.subscribe(
//   cItems => {
//     this.cartItems.push(cItems?.products)
//     console.log(this.cartItems)
//   })
//   const cartItem = new CartItem(product, this.cartChange.value?.id || 55, 1);
//   return this.http.post(environment.baseUrl + "/carts/addItem", cartItem).pipe(
//     tap(res => res)
//   )
// }
//     console.log(this.cartItems)
//         for ( let i in this.cartItems){
//        if(this.cartItems?[i].id == product.id){
//         this.updateCartItemQty(this.cartItems])
//        }
//       else{
//     const cartItem = new CartItem(product, this.cartChange.value?.id || 55, 1);
//     return this.http.post(environment.baseUrl + "/carts/addItem", cartItem).pipe(
//       tap(res => res)
//       )
//   }
// return console.log("")
// }
// }




  updateCartItemQty(cartItem: CartItem){
    let body = {quantity:cartItem.quantity , totalPrice:cartItem.totalPrice, cartItemId:cartItem.id}
    return this.http.put<any>(environment.baseUrl + "/carts/quantity/",body).pipe(
      map(res => res)
    )
  }

  removeFromCart(product: CartItem) {
    return this.http.delete(environment.baseUrl + "/carts/" + product.id).pipe(
      tap(res => {
        if (this.cartChange.value) {
          this.cartChange.value.products = this.cartChange.value.products.filter(cartItem => cartItem.id != product.id)
          this.setCart(this.cartChange.value);
        }
      })
    )
  }

  removeAllFromCart(cartId: number) {
    return this.http.delete(environment.baseUrl + "/carts/clear/" + cartId).pipe(
      map(res => res)
    )
  }



}
