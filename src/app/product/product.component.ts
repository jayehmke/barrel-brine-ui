import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../lib/category/category.service';

@Component({
  selector: 'app-product',
  providers: [
    CategoryService,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public categoryData: any;

  constructor(public categoryService: CategoryService,) {
  }

  ngOnInit() {
    this.fetchCategories();
  }


  private fetchCategories() {
    this.categoryService.getWithProducts().subscribe((data) => {
      console.log('dis', data)
      this.categoryData = data['categories'];

    });
  }
}
