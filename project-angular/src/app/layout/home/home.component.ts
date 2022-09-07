import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../product/service/category.service';
import {Category} from '../../product/model/category';
import {ProductService} from '../../product/service/product.service';
import {Product} from '../../product/model/product';
import {AuthService} from '../../user/service/auth.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  newProducts: Product[] = [];
  public role: string;
  public username: string = '';
  public loginStatus: any;
  categoriesDiscount: Category[] = [];
  categorySize: number;
  categoryTotalElements: number;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private authService: AuthService) {
    $('#home-page').attr('class', 'nav-item nav-link active');
    this.authService.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.authService.getRoles().subscribe(resp => {
          this.getRole(resp);
        }, error => {
        });
      }
    }, error => {
    });
  }

  getRole(value: any) {
    if (this.isAdmin(value.grantList)) {
      this.role = 'ROLE_ADMIN';
    } else if (this.isUser(value.grantList)) {
      this.role = 'ROLE_USER';
    }
    this.username = value.username;
  }

  isAdmin(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_ADMIN';
    });
  }

  isUser(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_USER';
    });
  }

  ngOnInit(): void {
    this.getAllCategories(3);
    this.getNewProducts();
    this.getCategoriesDiscount();
  }

  getAllCategories(size: number) {
    this.categoryService.getAllCategoriesPage(size).subscribe(value => {
      // @ts-ignore
      if (value.totalElements >= 0) {
        // @ts-ignore
        this.categories = value.content;
        // @ts-ignore
        this.categorySize = value.size;
        // @ts-ignore
        this.categoryTotalElements = value.totalElements;
      }
    });
  }

  getNewProducts() {
    this.productService.getNewProducts().subscribe(value => {
      this.newProducts = value;
    });
  }

  getCategoriesDiscount() {
    this.categoryService.getCategoriesDiscount().subscribe(value => {
      this.categoriesDiscount = value;
    });
  }

  seeCategoryMore() {
    if (this.categorySize < this.categoryTotalElements) {
      this.categorySize += 3;
      this.getAllCategories(this.categorySize);
    }
  }

  ngOnDestroy(): void {
    $('#home-page').attr('class', 'nav-item nav-link');
  }
}
