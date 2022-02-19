import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category-interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() categories?: Category[] | null;

  @Output() categoryChange = new EventEmitter<Category>()

  constructor() { }

onCategoryChange(category: Category){
  this.categoryChange.emit(category)
}

  ngOnInit(): void {
  }

}
