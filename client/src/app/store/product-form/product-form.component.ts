import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup

  constructor(private _formBuilder: FormBuilder, private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
  //   this.productForm = this._formBuilder.group({
  //     name: ['', [Validators.required,]],
  //     categoryId: ['', Validators.required],
  //     price: ['', Validators.required],
  //     imgUrl: ['', Validators.required],
  // })

}




createForm(){
  this.productForm = this._formBuilder.group({
    name: ['', [Validators.required,]],
    categoryId: ['', Validators.required],
    price: ['', Validators.required],
    imgUrl: ['', Validators.required],
})
}

onSubmit() {
  const formValue = {
    ...this.productForm.value,
  }
  // this.orderService.addNewOrder(formValue).subscribe()
  console.log(formValue)
  this.productService.addNewProduct(formValue).subscribe()
    this.router.navigate(['store']);

}


}




