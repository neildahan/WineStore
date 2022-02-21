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
  cart$ = this.cartChange.asObservable()

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
    console.log(this.cartChange.value)
    const cartItem = new CartItem(product, this.cartChange.value?.id || 55, 1);
    console.log(cartItem)
    return this.http.post(environment.baseUrl + "/carts/addItem", cartItem).pipe(
      tap(res => {
        // if (this.cartChange.value) {
          // this.cartChange.value.products.push(cartItem)
          // this.setCart(this.cartChange.value)
        // }
      })
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


  // addToCart(product: any) {
  //   //   return this.http.post<BaseResponse<any[]>>(environment.baseUrl + "/carts/additem/",
  //   //   {
  //   //     "productId" : product.id,
  //   //     "quantity" : product.quantity,
  //   //     "cartId" : 1,
  //   //     "productPrice" : product.price
  //   // }
  //   // )


  //   // for(let i in this.cartItemList){
  //   //   if(this.cartItemList[i].id === product.id){
  //   //     this.cartItemList[i].quantity++

  //   //   }
  //   //   else{
  //   this.cartItemList.push(product)
  //   this.productList.next(this.cartItemList)
  //   this.getTotalPrice()
  //   console.log(this.cartItemList)
  // }
  // //   }
  // // }

  // // }

  // getTotalPrice(): number {
  //   let grandTotal = 0;
  //   this.cartItemList.map((a: any) => {
  //     grandTotal += a.total;
  //   })
  //   return grandTotal;
  // }

  // removeCartItem(product: any) {
  //   this.cartItemList.map((a: any, index: any) => {
  //     if (product.id === a.id) {
  //       this.cartItemList.splice(index, 1)
  //     }
  //   })
  // }

  // removeAllCart() {
  //   this.cartItemList = []
  //   this.productList.next(this.cartItemList)
  // }


}
