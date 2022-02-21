import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response.interface';
import { Category } from '../models/category-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private currentCategoryChange: BehaviorSubject<Category | null> = new BehaviorSubject<Category | null>(null)
  currentCategory$ = this.currentCategoryChange.asObservable();

  private categoriesChange: BehaviorSubject<Category[] | null> = new BehaviorSubject<Category[] | null>([])
  categories$ = this.categoriesChange.asObservable();

  get categories() {
    return this.categoriesChange.value;
  }

  get currentCategory() {
    return this.currentCategoryChange.value;
  }

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<BaseResponse<Category[]>>(environment.baseUrl + "/categories/").pipe(
      map((res) => {
        this.setCategories(res.data)
        this.setCurrentCategory(res.data?.[0]);
        return res.data
      })
    )
  }

  setCategories(categories: Category[]) {
    this.categoriesChange.next(categories)
  }

  setCurrentCategory(category: Category) {
    this.currentCategoryChange.next(category)
  }

}
