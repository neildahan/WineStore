import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product-interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup
  product!: Product;
  constructor(private _formBuilder: FormBuilder, private productService: ProductService,
    private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // const productId = this.activeRoute.snapshot.paramMap.get("productId")
    this.activeRoute.paramMap.pipe(
      filter(params => {
        console.log(params)
        const productId = params.get('productId') || null;
        if (!productId) {
          this.createForm();
        }
        return productId != null;
      }),
      switchMap(params => {
        const productId = params.get('productId') || "";
        return this.productService.getProductById(+productId)
      })
    ).subscribe((product) => {
      this.product = product;
      this.createForm(product)
    })
  }


  createForm(product?: Product) {
    this.productForm = this._formBuilder.group({
      id: [product?.id || ''],
      name: [product?.name || '', [Validators.required,]],
      categoryId: [product?.categoryId || '', Validators.required],
      price: [product?.price || '', Validators.required],
      imgUrl: [product?.imgUrl || '', Validators.required],
    })
  }

  onSubmit() {
    const formValue = {
      ...this.productForm.value,
    }
    // this.orderService.addNewOrder(formValue).subscribe()
    console.log(formValue)

    if (this.product) {
      this.productService.updateProduct(formValue).subscribe()
    } else {
      this.productService.addNewProduct(formValue).subscribe()
    }
    this.router.navigate(['store']);
  }


}




