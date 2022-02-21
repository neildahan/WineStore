import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category-interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() categories?: Category[] | null;

  @Output() categoryChange = new EventEmitter<Category>()

  constructor(private categoriesService: CategoriesService) { }

  currentCategory$ = this.categoriesService.currentCategory$
  toggle: boolean = false;

  toggleColor() {
    this.toggle = !this.toggle;
  }

onCategoryChange(category: Category){
  this.categoryChange.emit(category)
  this.toggle = true;
  console.log(category)
}

  ngOnInit(): void {
  }

}
