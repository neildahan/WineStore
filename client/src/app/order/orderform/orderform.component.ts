import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class OrderformComponent implements OnInit {

  orderForm!: FormGroup
  @Input() cartItems?: CartItem[] | any;
  @Input() totalPrice?: number | null;
  isLoading = false


  constructor(private _formBuilder: FormBuilder, private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.orderForm = this._formBuilder.group({
      city: ['', [Validators.required,]],
      street: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      creditCard: ['', Validators.required],
    });
  }

  onSubmit() {
    this.toggleLoading()
    const formValue = {
      ...this.orderForm.value,
      orderDate: '2019-12-31',
      cartId: this.cartItems.id,
      totalPrice: this.totalPrice,
    }
    // this.orderService.addNewOrder(formValue).subscribe()
    console.log(formValue)
    this.orderService.createNewOrder(formValue).subscribe()
    setTimeout(() => {
      this.router.navigate(['thank-you'], { queryParams: { registered: 'true' } });
    }, 3000)
   
  }

  toggleLoading = () => {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false
    }, 3000)

  }


}
