import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: any[] = []
  constructor(private http:HttpClient) { }
}
